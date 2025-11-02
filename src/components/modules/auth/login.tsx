"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import checkAuthStatus from "@/utility/auth";
import loginUser from "@/utility/loginuser";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    try {
      const res = await loginUser(payload)

      if (res.ok) {
        const authStatus = await checkAuthStatus()
        if (authStatus.isAuthenticated && authStatus.user) {
          const { role } = authStatus.user
          switch (role) {
            case "ADMIN":
              toast.success("Admin successfully logged in");
              router.push("/dashboard");
              break;
            case "PATIENT":
              toast.success("Patient successfully logged in");
              router.push("/dashboard");
              break;
            case "DOCTOR":
              toast.success("Doctor successfully logged in");
              router.push("/dashboard");
              break;

            default:
              router.push("/");
              break;
          }
        }
        toast.error("Somthing went wrong! Login failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Login failed");
      console.error(error.message || "Login failed. Please check your credentials and try again.")
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email or Username
            </label>
            <Input
              id="email"
              {...register("email", { required: "Email is required" })}
              className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none ${errors.email ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", { required: "Password is required" })}
                className={`block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none pr-10 ${errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="Enter your password"
              />
              <Button
                type="button"
                variant={"ghost"}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute cursor-poiner inset-y-0 right-0 px-3 flex items-center text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember me & forgot password */}
          <div className="flex items-center justify-between text-sm">
            <Link href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Login button */}
          <Button
            type="submit"
            className="w-full cursor-pointer py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            Login
          </Button>
        </form>

        {/* Optional register link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
