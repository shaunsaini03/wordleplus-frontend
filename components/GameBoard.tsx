"use client";

import { useEffect, useMemo } from "react";

import { Dispatch, SetStateAction } from "react";
import Keyboard, { LetterState } from "@/components/Keyboard";


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

  const letterStates = useMemo(() => {
    const states: Record<string, LetterState> = {};
    const priority: Record<LetterState, number> = { correct: 3, present: 2, absent: 1, unused: 0 };

    for (const guess of guesses) {
      for (let i = 0; i < guess.guessWord.length; i++) {
        const letter = guess.guessWord[i];
        const code = guess.result[i];
        const state: LetterState = code === "G" ? "correct" : code === "Y" ? "present" : "absent";
        if ((priority[state] ?? 0) > (priority[states[letter]] ?? 0)) {
          states[letter] = state;
        }
      }
    }

    return states;
  }, [guesses]);

  function handleKey(key: string) {
    if (finished) return;

    if (key === "enter") {
      onSubmitGuess();
      return;
    }

    if (key === "backspace") {
      setCurrentGuess(prev => prev.slice(0, -1));
      return;
    }

    if (/^[a-z]$/.test(key)) {
      setCurrentGuess(prev => {
        if (prev.length >= wordLength) return prev;
        return prev + key;
      });
    }
  }

  useEffect(() => {
    const isMobile =
      typeof window !== "undefined" &&
      /Mobi|Android|iPhone/i.test(navigator.userAgent);

    if (isMobile) return;

    function handleKeyDown(e: KeyboardEvent) {
      handleKey(e.key.toLowerCase());
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [wordLength, finished, onSubmitGuess, setCurrentGuess]);

  return (
    <div className="flex flex-col items-center gap-4">
  
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

      <Keyboard letterStates={letterStates} onKey={handleKey} />
    </div>
  );
}