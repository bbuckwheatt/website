'use client';

/*
 * StopMotionEditor.tsx — Main editor layout: canvas + sidebar + control panel
 *
 * WHY 'use client':
 *   Heavy state management (frames array, playback, current frame index),
 *   refs to Konva layers, file I/O via FileReader, and gif.js encoder.
 *   None of this can run on the server.
 *
 * Chakra removed:
 *   <Box> → <div>
 *   <Flex direction="column"> → <div className="flex flex-col">
 *   <Flex> (row) → <div className="flex">
 *   <Spacer /> → <div className="flex-1" />
 *
 * gif.js note: uses a Web Worker blob created in WorkerSetup.ts.
 * If GIF export breaks in production, add 'gif.js' to transpilePackages
 * in next.config.ts (gif.js uses CommonJS require() internally).
 */

import React, { useEffect, useState, ChangeEvent } from 'react';
import Konva from 'konva';
import { FigureElement, generateFigure, FigureType } from './FigureElements';
import { Frame } from './Frame';
import { ControlPanel } from './components/ControlPanel';
import { FiguresSelectionPanel } from './components/FiguresSelectionPanel';
import { Canvas } from './components/Canvas';
import { SimpleShape, TextShape, createSimpleShape } from './components/SimpleShape';
import GIF from 'gif.js';
import { workerBlob } from './WorkerSetup';
import { saveBlob } from './Util';

export function StopMotionEditor({ backHome }: { backHome: () => void }): React.ReactElement {
  const [playbackMode, setPlaybackMode] = useState<boolean>(false);
  useEffect(() => {}, []);

  const activeLayerRef = React.useRef<Konva.Layer>(null);

  const defaultFrame: Frame = { frameID: 1, canvasElements: [] };
  const [frames, setFrames] = useState<Frame[]>([defaultFrame]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);

  // ── Element addition helpers ──────────────────────────────────────────────

  const addFigure = (newElems: FigureElement[]) => {
    setCurrentFrameIndex(frames.length - 1);
    setFrames(prev => {
      const updated = prev.slice(0, -1);
      const last = prev[prev.length - 1];
      last.canvasElements = [...last.canvasElements, ...newElems];
      updated.push(last);
      return updated;
    });
  };

  const addSimpleShape = (newElem: SimpleShape) => {
    setCurrentFrameIndex(frames.length - 1);
    setFrames(prev => {
      const updated = prev.slice(0, -1);
      const last = prev[prev.length - 1];
      last.canvasElements = [...last.canvasElements, newElem];
      updated.push(last);
      return updated;
    });
  };

  const addTextShape = (text: string) => {
    setCurrentFrameIndex(frames.length - 1);
    setFrames(prev => {
      const updated = prev.slice(0, -1);
      const last = prev[prev.length - 1];
      const newElem: TextShape = {
        type: 'textShape',
        text,
        x: 773,
        y: 500,
        id: crypto.randomUUID(),
        isDragging: false,
        rotation: 0,
      };
      last.canvasElements = [...last.canvasElements, newElem];
      updated.push(last);
      return updated;
    });
  };

  const addPerson = () => addFigure(generateFigure(FigureType.PERSON, 773, 500));
  const addAnimal = () => addFigure(generateFigure(FigureType.ANIMAL, 773, 500));
  const addBird   = () => addFigure(generateFigure(FigureType.BIRD, 773, 500));
  const addText   = (text: string) => addTextShape(text);
  const addCircle = () => addSimpleShape(createSimpleShape('circle'));
  const addStar   = () => addSimpleShape(createSimpleShape('star'));
  const addRect   = () => addSimpleShape(createSimpleShape('rect'));

  // ── Frame navigation ──────────────────────────────────────────────────────

  function addNewFrame() {
    setCurrentFrameIndex(frames.length);
    setFrames(prev => {
      // Clone the last frame's elements so each frame starts as a copy of the previous
      const newFrameElements = prev[prev.length - 1].canvasElements.map(elem => ({ ...elem }));
      return [...prev, { frameID: prev.length + 1, canvasElements: newFrameElements }];
    });
  }

  const frameForward  = () => { if (currentFrameIndex < frames.length - 1) setCurrentFrameIndex(i => i + 1); };
  const frameBackward = () => { if (currentFrameIndex > 0) setCurrentFrameIndex(i => i - 1); };

  // ── Playback ──────────────────────────────────────────────────────────────

  const playback = async () => {
    const delay = 150;
    setPlaybackMode(true);
    setCurrentFrameIndex(0);

    const playNextFrame = async (count: number) => {
      if (count < frames.length - 1) {
        setTimeout(() => {
          setCurrentFrameIndex(count + 1);
          playNextFrame(count + 1);
        }, delay);
      } else {
        setPlaybackMode(false);
      }
    };

    await playNextFrame(0);
  };

  // ── GIF export ────────────────────────────────────────────────────────────
  //
  // gif.js renders each Konva canvas frame into the encoder by capturing the
  // raw 2D context after React re-renders each frame sequentially.
  // The workerBlob is an inline Web Worker (see WorkerSetup.ts) that avoids
  // needing a static /gif.worker.js file on the server.

  const exportMovie = async () => {
    const delay = 150;
    setPlaybackMode(true);
    setCurrentFrameIndex(0);

    if (activeLayerRef.current === null) throw new Error('Canvas layer ref is null');
    const canvas = activeLayerRef.current.canvas;
    const gif = new GIF({
      workers: 1,
      workerScript: URL.createObjectURL(workerBlob),
      quality: 10,
      height: canvas.height,
      width: canvas.width,
    });
    gif.on('finished', (blob: Blob) => saveBlob(blob));

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const doNextFrame = async (count: number) => {
      if (count < frames.length - 1) {
        await sleep(delay);
        if (activeLayerRef.current !== null) {
          gif.addFrame(activeLayerRef.current.canvas.context._context, { copy: true });
        }
        setCurrentFrameIndex(count + 1);
        await doNextFrame(count + 1);
      } else {
        setPlaybackMode(false);
      }
    };

    await doNextFrame(0);
    gif.render();
  };

  // ── File I/O ──────────────────────────────────────────────────────────────

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = (event.target.files as FileList)[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      if (e.target?.result) {
        const savedFrames = JSON.parse(e.target.result as string);
        if (savedFrames.length !== 0) {
          setCurrentFrameIndex(0);
          setFrames(savedFrames);
        }
      }
    };
    reader.readAsText(file);
  };

  function saveAnimState() {
    const blob = new Blob([JSON.stringify(frames)], { type: 'application/json' });
    saveBlob(blob);
  }

  // Programmatically click the hidden <input type="file"> from ControlPanel
  const triggerFileInput = () => document.getElementById('fileInput')?.click();

  const resetFrames = () => {
    setFrames([defaultFrame]);
    setCurrentFrameIndex(0);
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Row 1: sidebar + canvas */}
      <div className="flex flex-1 overflow-hidden">
        <FiguresSelectionPanel
          addPerson={addPerson}
          addAnimal={addAnimal}
          addBird={addBird}
          addText={addText}
          addCircle={addCircle}
          addStar={addStar}
          addRect={addRect}
        />
        {/* flex-1 pushes canvas to fill remaining width (replaces Chakra <Spacer />) */}
        <div className="flex-1" />
        <Canvas
          frames={frames}
          setFrames={setFrames}
          playbackMode={playbackMode}
          currentFrame={currentFrameIndex}
          activeLayerRef={activeLayerRef}
        />
      </div>

      {/* Row 2: control bar */}
      <ControlPanel
        addNewFrame={addNewFrame}
        playback={playback}
        frameBackward={frameBackward}
        frameForward={frameForward}
        backHome={backHome}
        fileInput={triggerFileInput}
        saveAnimState={saveAnimState}
        handleChange={handleFileChange}
        exportMovie={exportMovie}
        reset={resetFrames}
      />
    </div>
  );
}
