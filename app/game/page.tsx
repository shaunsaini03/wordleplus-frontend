"use client";

import { useEffect, useState } from "react";
import { getTodaySession } from "@/lib/api";
import GameBoard from "@/components/GameBoard";
import { submitGuess } from "@/lib/api";

export default function GamePage() {

  const [sessionId, setSessionId] = useState<number | null>(null);
  const [wordLength, setWordLength] = useState<number>(0);
  const [maxGuesses, setMaxGuesses] = useState<number>(0);
  const [guesses, setGuesses] = useState<any[]>([]);
  const [finished, setFinished] = useState(false);
  const [currentGuess, setCurrentGuess] = useState("");
  


  async function handleSubmitGuess() {

    if (!sessionId) return;
    if (currentGuess.length !== wordLength) return;
  
    const res = await submitGuess(sessionId, currentGuess);
    console.log(res);
  
    setGuesses(prev => [...prev, res]);
  
    setCurrentGuess("");
  
    if (res.result === "G".repeat(wordLength) || guesses.length + 1 === maxGuesses) {
      setFinished(true);
    }
  }

  useEffect(() => {
    loadSession();
  }, []);

  async function loadSession() {

    const username = localStorage.getItem("username");

    if (!username) return;

    const data = await getTodaySession(username);

    setSessionId(data.sessionId);
    setWordLength(data.wordLength);
    setMaxGuesses(data.maxGuesses);
    setGuesses(data.guesses);
    setFinished(data.finished);
  }

  return (
    <main className="flex flex-col items-center mt-20 gap-6">

      <GameBoard 
        wordLength={wordLength} 
        maxGuesses={maxGuesses} 
        guesses={guesses} 
        currentGuess={currentGuess} 
        setCurrentGuess={setCurrentGuess} 
        finished={finished}
        onSubmitGuess={handleSubmitGuess}
      />

        {finished && (
        <button
            className="mt-6 px-6 py-3 border rounded font-bold hover:bg-gray-100"
            onClick={() => window.location.href = "/leaderboard"}
        >
            View Leaderboard
        </button>
        )}

    </main>

    
  );
}