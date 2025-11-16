export const API_URL = `http://localhost:3333`;

export function LOGIN_USER_POST(body: { email: string; password: string }) {
  return {
    url: `${API_URL}/auth/login`,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  };
}

export function USER_PROFILE_GET() {
  return {
    url: `${API_URL}/users/profile`,
    options: {
      headers: {
        Authorization: `Berear ${window.localStorage.getItem("token")|| ""}`,
      }
    },
  };
}
 

export function REGISTER_USER_POST(body: {
  username: string;
  email: string;
  password: string;
}) {
  return {
    url: `${API_URL}/auth/register`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}
