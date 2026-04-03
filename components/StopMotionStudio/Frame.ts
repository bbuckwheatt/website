/*
 * Frame.ts — Frame data structure for the stop motion timeline
 *
 * Pure TypeScript interface — no browser APIs, safe to import anywhere.
 */

import { CanvasElement } from './CanvasElements';

// A Frame is one "cel" in the stop motion animation.
// The Studio stores an ordered array of these to represent the full timeline.
export interface Frame {
  frameID: number;
  canvasElements: CanvasElement[];
}
