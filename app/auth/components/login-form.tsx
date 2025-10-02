import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/services/auth/mutation";
import { Eye, EyeOff, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { mutate: loginMutation } = useLogin();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation(loginData, {
      onSuccess: () => {
        toast.success("Logged in successfully");
        router.push("/");
      },
      onError: () => {
        toast.error("Login failed. Please check your credentials.");
      },
    });
  };
  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            className="pl-10"
            value={loginData.email}
            onChange={(e) =>
              setLoginData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            required
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg">
        {/* {isLogging ? "Signing In..." : "Sign In"} */}
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
