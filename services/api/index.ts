// import useAuthStore from "@/lib/store/useAuthStore";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// api configuration
export default axios.create({
  baseURL: BASE_URL,
});

/**
 * for header jwt token
 * @returns {object} headers
 */
export const authJsonHeader = (status: boolean = false) => {
//   const token = useAuthStore.getState().auth.accessToken;
  return {
    Accept: "application/json",
    "Content-Type": status ? "multipart/form-data" : "application/json",
    // ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};
