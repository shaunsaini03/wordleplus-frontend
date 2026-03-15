"use client";

import { useEffect, useState } from "react";
import Leaderboard from "@/components/Leaderboard";
import { getDailyLeaderboard, getGlobalLeaderboard } from "@/lib/api";

export default function LeaderboardPage() {

  const [daily, setDaily] = useState([]);
  const [global, setGlobal] = useState([]);
  const [mode, setMode] = useState<"daily" | "global">("daily");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const d = await getDailyLeaderboard();
    const g = await getGlobalLeaderboard();

    setDaily(d);
    setGlobal(g);
  }

  return (
    <main className="flex flex-col items-center mt-20 gap-6">

      <div className="flex gap-4">

        <button
          className="border px-4 py-2"
          onClick={() => setMode("daily")}
        >
          Daily
        </button>

        <button
          className="border px-4 py-2"
          onClick={() => setMode("global")}
        >
          Global
        </button>

      </div>

      {mode === "daily" && (
        <Leaderboard entries={daily} type="daily" />
      )}

      {mode === "global" && (
        <Leaderboard entries={global} type="global" />
      )}

    </main>
  );
}