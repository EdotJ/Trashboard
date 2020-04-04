import { authHeader } from "../helpers/auth-header";

export const userService = {
  login,
  logout,
  register,
  getById,
  update
};

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usernameOrEmail: username, password })
  };
  return fetch(`${process.env.config.apiUrl}/api/auth/signin`, requestOptions)
    .then(handleResponse)
    .then(user => {
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    });
}

function logout() {
  localStorage.removeItem("user");
}

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${process.env.config.apiUrl}/users/${id}`, requestOptions).then(
    handleResponse
  );
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch(
    `${process.env.config.apiUrl}/api/auth/signup`,
    requestOptions
  ).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch(
    `${process.env.config.apiUrl}/users/${user.id}`,
    requestOptions
  ).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
        if (!window.location.pathname.includes("login")) {
          window.location.reload();
        }
      }
      const error = data || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
