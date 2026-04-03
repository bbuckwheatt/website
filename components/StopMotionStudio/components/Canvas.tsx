'use client';

/*
 * Canvas.tsx — Konva stage that renders the stop motion working area
 *
 * WHY 'use client':
 *   react-konva uses the browser Canvas API (HTMLCanvasElement) which does
 *   not exist in Node.js. This component must only ever run in the browser.
 *
 * Chakra removed: the single <Box> wrapper was replaced with a plain <div>.
 * Inline style is kept (not Tailwind) because canvasWidth/canvasHeight are
 * runtime JavaScript values, not build-time constants.
 */

import React, { useRef } from 'react';
import Konva from 'konva';
import { Stage, Layer, Text, Rect } from 'react-konva';
import { CanvasElement } from '../CanvasElements';
import { FigureElement, toKonvaElement } from '../FigureElements';
import { Frame } from '../Frame';
import { SimpleShape, simpleShapeToKonvaElement } from './SimpleShape';
import { textToKonvaText } from './Text';

/**
 * The Canvas for the Stop Motion Studio represents the working area of the Stop Motion Animator.
 * Here figures can be dragged around and manipulated on the top layer, and the previous layer
 * is visible with low opacity in order to see edit history for smooth animation creation.
 */

type CanvasProps = {
  frames: Frame[];
  setFrames: React.Dispatch<React.SetStateAction<Frame[]>>;
  playbackMode: boolean;
  currentFrame: number;
  activeLayerRef: React.RefObject<Konva.Layer | null>;
};

export const Canvas: React.FC<CanvasProps> = ({
  setFrames: update,
  frames: canvasFrames,
  playbackMode,
  currentFrame: currentFrameIndex,
  activeLayerRef,
}) => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const canvasWidth = 1300;
  const canvasHeight = 800;

  // Callback: syncs element positions back to frame state after drag events
  function updateFrameElements(elems: CanvasElement[]) {
    update((previousFrames: Frame[]) => {
      const updatedFrames = previousFrames.slice(0, -1);
      const lastFrame = previousFrames[previousFrames.length - 1];
      lastFrame.canvasElements = elems;
      updatedFrames.push(lastFrame);
      return updatedFrames;
    });
  }

  return (
    // Plain div replaces Chakra <Box> — inline style because dimensions are JS runtime values
    <div
      ref={canvasRef}
      style={{ width: canvasWidth, height: canvasHeight, backgroundColor: '#e5e5ea' }}
    >
      <Stage width={canvasWidth} height={canvasHeight}>

        {/* Ghost layer: previous frame at 10% opacity for onion-skinning reference */}
        {canvasFrames.length > 1 && currentFrameIndex > 0 && !playbackMode && (
          <Layer opacity={0.1}>
            {canvasFrames[currentFrameIndex - 1].canvasElements.map(elem => {
              if (elem.type === 'figure') {
                return toKonvaElement(
                  elem as FigureElement,
                  canvasFrames[currentFrameIndex - 1].canvasElements,
                  updateFrameElements,
                  false,
                );
              } else if (elem.type === 'simpleShape') {
                return simpleShapeToKonvaElement(
                  elem as SimpleShape,
                  canvasFrames[currentFrameIndex - 1].canvasElements,
                  updateFrameElements,
                  false,
                );
              } else if (elem.type === 'textShape') {
                return textToKonvaText(
                  elem,
                  canvasFrames[currentFrameIndex - 1].canvasElements,
                  updateFrameElements,
                  false,
                );
              }
            })}
          </Layer>
        )}

        {/* Active layer: current editable frame */}
        <Layer ref={activeLayerRef}>
          {/* Solid background rect only during GIF export — ensures opaque frame pixels */}
          {playbackMode && (
            <Rect
              id="export-background"
              key="export-background"
              x={0}
              y={0}
              width={canvasWidth}
              height={canvasHeight}
              fill="#e5e5ea"
              rotation={0}
            />
          )}
          {canvasFrames[currentFrameIndex].canvasElements.map(elem => {
            // Only the last frame in the array is editable; earlier frames are view-only
            const isEditable = currentFrameIndex === canvasFrames.length - 1;
            if (elem.type === 'figure') {
              return toKonvaElement(
                elem as FigureElement,
                canvasFrames[currentFrameIndex].canvasElements,
                updateFrameElements,
                isEditable,
              );
            } else if (elem.type === 'simpleShape') {
              return simpleShapeToKonvaElement(
                elem as SimpleShape,
                canvasFrames[currentFrameIndex].canvasElements,
                updateFrameElements,
                isEditable,
              );
            } else if (elem.type === 'textShape') {
              return textToKonvaText(
                elem,
                canvasFrames[currentFrameIndex].canvasElements,
                updateFrameElements,
                isEditable,
              );
            }
          })}
        </Layer>

        {/* HUD layer: frame counter overlay — always on top, never interactive */}
        <Layer>
          <Text
            offsetX={-10}
            offsetY={-10}
            fontSize={25}
            text={`${currentFrameIndex + 1} / ${canvasFrames.length}`}
          />
        </Layer>
      </Stage>
    </div>
  );
};
