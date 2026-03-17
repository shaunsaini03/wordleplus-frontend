"use client";

import { useEffect } from "react";

import { Dispatch, SetStateAction } from "react";


type Props = {
  wordLength: number;
  maxGuesses: number;
  guesses: any[];
  currentGuess: string;
  setCurrentGuess: Dispatch<SetStateAction<string>>;
  finished: boolean;
  onSubmitGuess: () => void;
};

export default function GameBoard({
  wordLength,
  maxGuesses,
  guesses,
  currentGuess,
  setCurrentGuess,
  finished,
  onSubmitGuess
}: Props) {

  useEffect(() => {

    // ✅ detect mobile
    const isMobile =
      typeof window !== "undefined" &&
      /Mobi|Android|iPhone/i.test(navigator.userAgent);

    if (isMobile) return; // 🚨 disable keyboard listener on mobile

    function handleKeyDown(e: KeyboardEvent) {

      if (finished) return;

      const key = e.key.toLowerCase();

      if (key === "enter") {
        onSubmitGuess();
        return;
      }

      if (key === "backspace") {
        setCurrentGuess(prev => prev.slice(0, -1)); // ✅ fix stale state
        return;
      }

      if (/^[a-z]$/.test(key)) {
        setCurrentGuess(prev => {
          if (prev.length >= wordLength) return prev;
          return prev + key;
        });
      }

    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };

  }, [wordLength, finished, onSubmitGuess, setCurrentGuess]);

  return (
    <div className="flex flex-col gap-2">
  
      {Array.from({ length: maxGuesses }).map((_, row) => {
  
        const guess = guesses[row];
  
        return (
          <div key={row} className="flex gap-2">
  
            {Array.from({ length: wordLength }).map((_, col) => {
  
              let letter = "";
              let bg = "bg-white";
              let border = "border-gray-400";
  
              if (guess) {
                letter = guess.guessWord[col];

                const result = guess.result[col];

                if (result === "G") bg = "bg-green-500 text-white";
                if (result === "Y") bg = "bg-yellow-400 text-white";
                if (result === "B") bg = "bg-gray-500 text-white";

                border = "border-transparent";
              }

              else if (row === guesses.length) {
                letter = currentGuess[col] || "";
              }
  
              return (
                <div
                  key={col}
                  className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 
                  border-2 ${border} flex items-center justify-center 
                  font-bold text-lg sm:text-xl uppercase ${bg}`}
                > 
                  {letter}
                </div>
              );
  
            })}
  
          </div>
  
        );
      })}
  
    </div>
  );
}