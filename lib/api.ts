const API_BASE = "https://wordleplus-backend-1.onrender.com";
// const API_BASE = "http://localhost:8080";

function authHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function handleUnauthorized() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  window.location.href = "/login";
}

export async function register(username: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error("Registration failed");

  const data = await res.json();
  localStorage.setItem("token", data.token);
  localStorage.setItem("username", data.username);
  return data;
}

export async function login(username: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error("Login failed");

  const data = await res.json();
  localStorage.setItem("token", data.token);
  localStorage.setItem("username", data.username);
  return data;
}

export async function getTodaySession(username: string) {
  const res = await fetch(`${API_BASE}/session/today?username=${username}`, {
    headers: authHeaders(),
  });

  if (res.status === 401) { handleUnauthorized(); return; }
  if (!res.ok) throw new Error("Failed to load session");

  return res.json();
}

export async function submitGuess(sessionId: number, guessWord: string) {
  const res = await fetch(`${API_BASE}/guess`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ sessionId, guessWord }),
  });

  if (res.status === 401) { handleUnauthorized(); return; }
  if (!res.ok) throw new Error("Guess failed");

  return res.json();
}

export async function getDailyLeaderboard() {
  const res = await fetch(`${API_BASE}/leaderboard/daily`);
  if (!res.ok) throw new Error("Failed to load leaderboard");
  return res.json();
}

export async function getGlobalLeaderboard() {
  const res = await fetch(`${API_BASE}/leaderboard/global`);
  if (!res.ok) throw new Error("Failed to load leaderboard");
  return res.json();
}
