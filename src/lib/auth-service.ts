export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  provider?: "google" | "email";
}

const STORAGE_KEY = "tavbook_auth_user";
const LISTENERS: Array<(user: AuthUser | null) => void> = [];

export const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  "13710800504-rn24c24bv78sibhk1rvlisugl3ahjokh.apps.googleusercontent.com";

export function getStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setStoredUser(user: AuthUser | null) {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (e) {
    console.error("Failed to persist user session", e);
  }
  LISTENERS.forEach((cb) => cb(user));
}

export function subscribeAuth(callback: (user: AuthUser | null) => void) {
  LISTENERS.push(callback);
  callback(getStoredUser());
  return () => {
    const idx = LISTENERS.indexOf(callback);
    if (idx >= 0) LISTENERS.splice(idx, 1);
  };
}

export function logout() {
  setStoredUser(null);
}

/**
 * Decode JWT token payload without external library
 */
export function decodeJwtPayload(token: string): any {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed to decode JWT payload", e);
    return null;
  }
}
