"use client";

type Entry = {
  username: string;
  wins?: number;
  numGuesses?: number;
};

type Props = {
  entries: Entry[];
  type: "daily" | "global";
};

export default function Leaderboard({ entries, type }: Props) {

  return (
    <div className="flex flex-col gap-3 w-72">

      <h2 className="text-xl font-bold text-center">
        {type === "daily" ? "Daily Leaderboard" : "Global Leaderboard"}
      </h2>

      {entries.map((e, i) => (
        <div
          key={i}
          className="flex justify-between border p-2 rounded"
        >
          <span>
            {i + 1}. {e.username}
          </span>

          <span>
            {type === "daily" ? `${e.numGuesses}/6` : e.wins}
          </span>

        </div>
      ))}

    </div>
  );
}