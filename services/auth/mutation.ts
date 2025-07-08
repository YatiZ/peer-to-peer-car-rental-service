"use client"
// const register = async (payload: IdentifierPayload) => {
//     const response = await api.post("/auth/register", payload);
//     return RegisterSchema.parse(response.data);
//   };

import { useAuthStore } from "@/store/authStore";
import api from "../api";
import { LoginPayload, RegisterPayload } from "./type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";


const register = async (payload: RegisterPayload) => {
    const response = await api.post("/api/auth/register", payload);
    return response.data;
  };
  
  export const useRegister = () => {
    return useMutation({
      mutationFn: (payload: RegisterPayload) => register(payload),
      onSuccess: (data) => {
        console.log("Registration successful:", data);
      },
      onError: (error) => {
        console.error("Registration failed:", error);
      },
    });
  };

export const login = async (payload: LoginPayload) => {
    const response = await api.post("auth/login", payload);
    return response.data;
  };
  
  export const useLogin = () => {
    const { setUser } = useAuthStore();
    return useMutation({
      mutationFn: (payload: LoginPayload) => login(payload),
      onSuccess: (data) => {
        toast.success(data._metadata.message);
        setUser(data._data);
      },
    });
  };