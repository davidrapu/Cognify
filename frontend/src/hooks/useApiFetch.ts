import { useAuth } from "@/contexts/AuthContext/AuthContext";


const API_URL = import.meta.env.VITE_API_URL;
export function useApiFetch() {
  const { accessToken, refresh } = useAuth();

  const apiFetch = async (url: string, options: RequestInit = {}) => {
    // make the request with current access token
    let response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // access token expired
    if (response.status === 401) {
      const newToken = await refresh(); // try to get a new one

      if (newToken) {
        // retry original request with new token
        response = await fetch(`${API_URL}${url}`, {
          ...options,
          headers: {
            ...options.headers,
            "Content-Type": "application/json",
            Authorization: `Bearer ${newToken}`,
          },
        });
      } else {
        // refresh failed — redirect to login
        window.location.href = "/login";
      }
    }

    return response;
  };

  return apiFetch;
}
