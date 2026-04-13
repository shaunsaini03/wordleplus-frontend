"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, register } from "@/lib/api";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!username.trim() || !password.trim()) return;
    setError("");

    try {
      if (mode === "login") {
        await login(username.trim(), password);
      } else {
        await register(username.trim(), password);
      }
      router.push("/game");
    } catch {
      setError(mode === "login" ? "Invalid username or password." : "Registration failed. Username may be taken.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">

      <h1 className="text-4xl font-bold">Wordle Plus</h1>

      <div className="flex gap-2">
        <button
          onClick={() => { setMode("login"); setError(""); }}
          className={`px-4 py-2 rounded ${mode === "login" ? "bg-green-600 text-white" : "border"}`}
        >
          Login
        </button>
        <button
          onClick={() => { setMode("register"); setError(""); }}
          className={`px-4 py-2 rounded ${mode === "register" ? "bg-green-600 text-white" : "border"}`}
        >
          Register
        </button>
      </div>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border px-4 py-2 rounded w-64"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        className="border px-4 py-2 rounded w-64"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-64"
      >
        {mode === "login" ? "Login" : "Create Account"}
      </button>

    </main>
  );
}
