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
        Authorization: `Berear ${window.localStorage.getItem("token") || ""}`,
      },
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

export function TOKEN_VALIDATE_GET() {
  return {
    url: `${API_URL}/auth/token/validate`,
    options: {
      headers: {
        Authorization: `Berear ${window.localStorage.getItem("token") || ""}`,
      },
    },
  };
}
export function LIST_TASK_GET() {
  return {
    url: `${API_URL}/tasks`,
    options: {
      headers: {
        Authorization: `Berear ${window.localStorage.getItem("token") || ""}`,
      },
    },
  };
}

export function COMPLETE_TASK_PATCH(taskId: string) {
  return {
    url: `${API_URL}/tasks/${taskId}/complete`,
    options: {
      method: "PATCH",
      headers: {
        Authorization: `Berear ${window.localStorage.getItem("token") || ""}`,
      },
    },
  };
}

export function INCOMPLETE_TASK_PATCH(taskId: string) {
  return {
    url: `${API_URL}/tasks/${taskId}/incomplete`,
    options: {
      method: "PATCH",
      headers: {
        Authorization: `Berear ${window.localStorage.getItem("token") || ""}`,
      },
    },
  };
}

export function DELETE_TASK(taskId: string) {
  return {
    url: `${API_URL}/tasks/${taskId}`,
    options: {
      method: "DELETE",
      headers: {
        Authorization: `Berear ${window.localStorage.getItem("token") || ""}`,
      },
    },
  };
}

export function CREATE_TASK(body: { title: string; description: string }) {
  return {
    url: `${API_URL}/tasks`,
    options: {
      method: "POST",
      headers: {
        Authorization: `Berear ${window.localStorage.getItem("token") || ""}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}
