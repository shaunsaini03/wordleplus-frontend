"use client";

import { useEffect, useState } from "react";
import { getTodaySession, submitGuess } from "@/lib/api";
import GameBoard from "@/components/GameBoard";

export default function GamePage() {
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [wordLength, setWordLength] = useState<number>(0);
  const [maxGuesses, setMaxGuesses] = useState<number>(0);
  const [guesses, setGuesses] = useState<any[]>([]);
  const [finished, setFinished] = useState(false);
  const [currentGuess, setCurrentGuess] = useState("");
  const [loading, setLoading] = useState(true);

  async function handleSubmitGuess() {
    if (!sessionId) return;
    if (currentGuess.length !== wordLength) return;

    const res = await submitGuess(sessionId, currentGuess);

    setGuesses(prev => {
      const updated = [...prev, res];

      if (
        res.result === "G".repeat(wordLength) ||
        updated.length === maxGuesses
      ) {
        setFinished(true);
      }

      return updated;
    });

    setCurrentGuess("");
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
    setLoading(false);
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading...</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 px-4">

      <GameBoard
        wordLength={wordLength}
        maxGuesses={maxGuesses}
        guesses={guesses}
        currentGuess={currentGuess}
        setCurrentGuess={setCurrentGuess}
        finished={finished}
        onSubmitGuess={handleSubmitGuess}
      />

      {/* Mobile input */}
      {!finished && (
        <input
          type="text"
          value={currentGuess}
          onChange={(e) =>
            setCurrentGuess(
              e.target.value.toLowerCase().slice(0, wordLength)
            )
          }
          className="border p-3 text-lg rounded w-full max-w-xs text-center uppercase"
          placeholder="Type your guess"
        />
      )}

      {/* Submit button (mobile friendly) */}
      {!finished && (
        <button
          onClick={handleSubmitGuess}
          className="w-full max-w-xs py-3 bg-green-600 text-white rounded text-lg active:scale-95"
        >
          Submit Guess
        </button>
      )}

      {finished && (
        <button
          className="w-full max-w-xs py-3 border rounded font-bold active:scale-95"
          onClick={() => (window.location.href = "/leaderboard")}
        >
          View Leaderboard
        </button>
      )}
    </main>
  );
}