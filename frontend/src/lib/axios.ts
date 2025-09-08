import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/members/",
});

// Attach token if set
let token: string | null = null;

// Update Token Value
export function setAuthToken(jwt: string | null) {
  token = jwt;
  if (jwt) {
    api.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

// Optional: handle 401 globally
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // e.g., redirect to login
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
