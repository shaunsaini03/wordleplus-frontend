"use client";

const ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "⌫"],
];

type LetterState = "correct" | "present" | "absent" | "unused";

type Props = {
  letterStates: Record<string, LetterState>;
  onKey: (key: string) => void;
};

function keyBg(state: LetterState): string {
  switch (state) {
    case "correct": return "bg-green-500 text-white";
    case "present": return "bg-yellow-400 text-white";
    case "absent":  return "bg-gray-600 text-white";
    default:        return "bg-gray-200 text-black";
  }
}

export default function Keyboard({ letterStates, onKey }: Props) {
  return (
    <div className="flex flex-col items-center gap-1 w-full max-w-xs sm:max-w-sm">
      {ROWS.map((row, i) => (
        <div key={i} className="flex gap-1">
          {row.map((key) => {
            const isBackspace = key === "⌫";
            const isEnter = key === "enter";
            return (
              <button
                key={key}
                onClick={() => onKey(isBackspace ? "backspace" : key)}
                className={`h-10 sm:h-11 rounded font-bold text-sm uppercase select-none active:scale-95
                  ${isBackspace || isEnter ? "px-3 bg-gray-300 text-black" : `w-8 sm:w-9 ${keyBg(letterStates[key] ?? "unused")}`}`}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export type { LetterState };
