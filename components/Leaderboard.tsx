"use client";

type Entry = {
  username: string;
  wins?: number;
  numGuesses?: number | null;
  won?: boolean;
  maxGuesses?: number;
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

      {entries.map((e, i) => {

        return (
          <div
            key={i}
            className="flex justify-between border p-2 rounded"
          >
            <span>
              {i + 1}. {e.username}
            </span>

            <span>
              {type === "daily" ? (() => {

                const max = e.maxGuesses ?? 6; // safe fallback

                const status =
                  e.won === true
                    ? "won"
                    : e.numGuesses !== null &&
                      e.numGuesses !== undefined &&
                      e.numGuesses < max
                    ? "incomplete"
                    : "lost";

                return (
                  <span className="flex gap-2 items-center">
                    
                    <span>
                      {e.numGuesses !== null && e.numGuesses !== undefined
                        ? `${e.numGuesses}/${max}`
                        : `0/${max}`}
                    </span>

                    <span
                      className={`text-sm font-semibold ${
                        status === "won"
                          ? "text-green-600"
                          : status === "lost"
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {status === "won"
                        ? "Won"
                        : status === "lost"
                        ? "Lost"
                        : "In Progress"}
                    </span>

                  </span>
                );

              })() : (
                e.wins
              )}
            </span>

          </div>
        );
      })}

    </div>
  );
}