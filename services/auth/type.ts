import z from "zod";
import { LoginValidation } from "./validation";

export interface User {
    id: string;
    email: string;
    name: string;
    userType: "owner" | "renter";
    avatar?: string;
    phone?: string;
    location?: string;
    rating?: number;
    joinedDate: string;
    isVerified: boolean;
  }

  export interface RegisterData {
    email: string;
    password: string;
    name: string;
    userType: "owner" | "renter";
    phone: string;
    location: string;
  }

  export interface RegisterPayload extends RegisterData {
    comfirmPassword: string | null;
  }

  export type LoginPayload = z.infer<typeof LoginValidation>;