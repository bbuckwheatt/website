'use client';

/*
 * FiguresSelectionPanel.tsx — Left sidebar for adding elements to the canvas
 *
 * WHY 'use client':
 *   Uses useState for the text input and onClick handlers — both require
 *   the browser's React runtime. Not renderable in Node.js.
 *
 * Chakra removed:
 *   <Button> → <button>  (with shared Tailwind class)
 *   <VStack spacing={4}> → <div className="flex flex-col gap-4">
 *   <Textarea> → <textarea>
 *   <Box> wrapper → <div>
 */

import React, { useState, ChangeEvent } from 'react';

type FiguresSelectProps = {
  addPerson: () => void;
  addAnimal: () => void;
  addBird: () => void;
  addText: (text: string) => void;
  addCircle: () => void;
  addStar: () => void;
  addRect: () => void;
};

// Shared button style for all add-element buttons
const BTN =
  'w-full px-4 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] ' +
  'text-[var(--text-primary)] text-sm font-medium text-left ' +
  'hover:bg-[rgba(148,163,184,0.2)] transition-colors duration-150 cursor-pointer';

export const FiguresSelectionPanel: React.FC<FiguresSelectProps> = ({
  addPerson,
  addAnimal,
  addBird,
  addText,
  addCircle,
  addStar,
  addRect,
}) => {
  const [text, setText] = useState('');
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => setText(event.target.value);
  const handleSubmit = () => { addText(text); };

  return (
    <div className="w-48 bg-white border-r border-[var(--border)] p-4 flex flex-col gap-3 shrink-0">
      <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
        Add elements
      </p>

      {/* Figure buttons */}
      <button className={BTN} onClick={addPerson}>Add Person</button>
      <button className={BTN} onClick={addAnimal}>Add Animal</button>
      <button className={BTN} onClick={addBird}>Add Bird</button>

      {/* Shape buttons */}
      <button className={BTN} onClick={addCircle}>Add Circle</button>
      <button className={BTN} onClick={addStar}>Add Star</button>
      <button className={BTN} onClick={addRect}>Add Rect</button>

      {/* Text input + add button */}
      <textarea
        className="
          w-full px-3 py-2 rounded-lg text-sm resize-none
          border border-[var(--border)] bg-[var(--surface)]
          text-[var(--text-primary)] placeholder-[var(--text-muted)]
          focus:outline-none focus:ring-2 focus:ring-[var(--accent)]
        "
        rows={3}
        placeholder="Type here..."
        value={text}
        onChange={handleChange}
      />
      <button
        className="w-full px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
        onClick={handleSubmit}
      >
        Add Text
      </button>
    </div>
  );
};
