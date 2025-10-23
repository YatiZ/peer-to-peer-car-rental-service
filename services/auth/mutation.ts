"use client"
// const register = async (payload: IdentifierPayload) => {
//     const response = await api.post("/auth/register", payload);
//     return RegisterSchema.parse(response.data);
//   };

import { useAuthStore } from "@/store/authStore";
import api from "../api";
import { LoginPayload, RegisterPayload } from "./type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "next-auth/react";


const register = async (payload: RegisterPayload) => {
    const response = await api.post("/register/", payload);
    console.log("register data", response.data)
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
    const response = await api.post("/login/", payload);
    console.log("login data", response.data)
    return response.data;
  };
  
  export const useLogin = () => {
    const { setUser } = useAuthStore();
    return useMutation({
      mutationFn: (payload: LoginPayload) => login(payload),
      onSuccess: async(data) => {
        // toast.success(data._metadata.message);
        // setUser(data._data);
        await signIn("credentials",{
          accessToken: data.access,
          refreshToken: data.refresh,
          redirect: false,
        })
        console.log("signIn called", data)
      },
    });
  };

//logout
const logout = async(refreshToken: string)=> {
  return api.post('/logout/',{refresh:refreshToken},{headers: {'Content-Type': 'application/json' }}) 
}

export const useLogout=()=>{
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: logout,
    onSuccess: ()=>{
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');

      queryClient.clear();
    }
  })
}