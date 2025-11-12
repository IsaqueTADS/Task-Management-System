export const API_URL = `http://localhost:3333/`;

export function LOGIN_USER_POST(body: { email: string; password: string }) {
  return {
    url: `${API_URL}auth/login`,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  };
}
