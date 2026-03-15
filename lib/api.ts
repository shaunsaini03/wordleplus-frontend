const API_BASE = "https://wordleplus-backend-1.onrender.com";

export async function login(username: string) {

  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username })
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
}

export async function getTodaySession(username: string) {

    const res = await fetch(
      `${API_BASE}/session/today?username=${username}`
    );
  
    if (!res.ok) {
      throw new Error("Failed to load session");
    }
  
    return res.json();
  }


  export async function submitGuess(sessionId: number, guessWord: string) {
  
    const res = await fetch(`${API_BASE}/guess`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sessionId,
        guessWord
      })
    });
  
    if (!res.ok) {
      throw new Error("Guess failed");
    }
  
    return await res.json();
  }


  export async function getDailyLeaderboard() {
    const res = await fetch(`${API_BASE}/leaderboard/daily`);

    if (!res.ok) {
      throw new Error("Failed to load leaderboard");
    }

    return await res.json();
  }

export async function getGlobalLeaderboard() {
    const res = await fetch(`${API_BASE}/leaderboard/global`);

    if (!res.ok) {
        throw new Error("Failed to load leaderboard");
    }

    return await res.json();
}