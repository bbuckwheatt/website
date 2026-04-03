/*
 * CanvasElements.ts — Base type definitions for all canvas elements
 *
 * This is a pure TypeScript type file — no React, no browser APIs.
 * It can be imported by both Server and Client Components safely.
 */

// The discriminant union type that tells TypeScript which shape of object to expect.
// Every canvas element must have one of these type strings.
export type CanvasElementType = 'figure' | 'simpleShape' | 'textShape';

// Base interface extended by all specific canvas element types.
// The `type` field acts as the discriminant for type narrowing:
//   if (elem.type === 'figure') { /* TypeScript knows it's a FigureElement */ }
export interface CanvasElement {
  type: CanvasElementType;
}
