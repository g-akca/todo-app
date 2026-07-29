const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function buildApiUrl(path = "") {
  return `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export { API_URL };