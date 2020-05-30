import { userService } from "../services";

export function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        userService.logout();
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
