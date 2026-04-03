import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";

export function isTokenExpired(token: string) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export async function refreshAccessToken() {
  const refresh = localStorage.getItem("refresh");

  if (!refresh) return null;

  try {
    const res = await axios.post(`${BASE_URL}accounts/token/refresh/`, {
      refresh,
    });

    const newAccess = res.data.access;
    localStorage.setItem("access", newAccess);

    return newAccess;
  } catch {
    localStorage.clear();
    return null;
  }
}