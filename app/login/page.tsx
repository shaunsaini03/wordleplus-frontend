"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleLogin = async () => {

    if (!username.trim()) return;

    const res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username })
    });

    const data = await res.json();

    localStorage.setItem("username", username);

    router.push("/game");
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-6">

      <h1 className="text-4xl font-bold">Login</h1>

      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border px-4 py-2 rounded w-64"
      />

      <button
        onClick={handleLogin}
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Start Game
      </button>

    </main>
  );
}