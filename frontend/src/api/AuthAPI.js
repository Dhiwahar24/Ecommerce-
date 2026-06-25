const BASE_URL = "http://localhost:8080/auth";

export const registerUser = async (user) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Registration failed");
  }

  return res.json();
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return res.text();
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};

export const getLoggedInUser = () => {
  return localStorage.getItem("user");
};
