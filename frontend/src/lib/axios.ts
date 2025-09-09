import axios from "axios";

// Singleton axios API object
const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/members/",
  withCredentials: true,
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

  console.log("updated auth token!");
}

export default api;
