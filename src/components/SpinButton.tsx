'use client';

import { useState } from 'react';

interface SpinButtonProps {
  isSpinning?: boolean;
  hasDestination?: boolean;
  onSpin: () => void;
}

export default function SpinButton({
  isSpinning = false,
  hasDestination = false,
  onSpin,
}: SpinButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const buttonText = hasDestination ? 'Spin Again' : 'Spin the Globe';
  const instructionText = "Let fate choose your next adventure";

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
      <div className="pointer-events-auto">
        <button
          onClick={onSpin}
          disabled={isSpinning}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            relative px-8 py-4 rounded-lg font-display font-bold text-lg tracking-wide
            transition-all duration-300 ease-out
            ${
              isSpinning
                ? 'bg-black/40 border border-white/20 cursor-not-allowed opacity-60'
                : `
                  bg-black/30 border border-white/40 backdrop-blur-sm
                  hover:bg-black/40 hover:border-white/60
                  ${isHovered ? 'shadow-lg shadow-white/20' : 'shadow-md shadow-white/10'}
                `
            }
            text-white
          `}
        >
          {isSpinning ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              <span>Spinning...</span>
            </div>
          ) : (
            buttonText
          )}
        </button>

        {!isSpinning && (
          <p className="display-text-italic text-center mt-4 text-white/70">
            {instructionText}
          </p>
        )}
      </div>
    </div>
  );
}
