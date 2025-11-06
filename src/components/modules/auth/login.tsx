"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { logInUser } from "@/services/auth/logInUser";

export type LoginFormInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [state, formActoin, isPending] = useActionState(logInUser, null);
  console.log(state);

  // const router = useRouter();

  // const onSubmit = async (data: LoginFormInputs) => {
  //   const payload = {
  //     email: data.email,
  //     password: data.password,
  //   };
  //   try {
  //     const res = await loginUser(payload);
  //     // console.log("[In login.tsx] res in login file", res);
  //     console.log("[In login.tsx] res.success", res.success);
  //     console.log(res);

  //     if (res.success) {
  //       const authStatus = await checkAuthStatus();
  //       console.log("[In login.tsx] authStatus", authStatus);
  //       // if (condition) {
  //       // }
  //       if (authStatus.isAuthenticated && authStatus.user) {
  //         const { role } = authStatus.user;
  //         switch (role) {
  //           case "ADMIN":
  //             toast.success("Admin successfully logged in");
  //             router.push(`/${role.toLowerCase()}/dashboard`);
  //             break;
  //           case "PATIENT":
  //             toast.success("Patient successfully logged in");
  //             router.push(`/${role.toLowerCase()}/dashboard`);
  //             break;
  //           case "DOCTOR":
  //             toast.success("Doctor successfully logged in");
  //             router.push(`/${role.toLowerCase()}/dashboard`);
  //             break;

  //           default:
  //             router.push("/");
  //             break;
  //         }
  //       }
  //     } else {
  //       toast.error(res.message || "Somthing went wrong! Login failed");
  //     }

  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   } catch (error: any) {
  //     console.log(error);

  //     toast.error(error.message || "Login failed");
  //     console.error(
  //       error.message ||
  //         "Login failed. Please check your credentials and try again."
  //     );
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          {isPending ? "Logging in" : "Login to Your Account"}
        </h2>
        <form action={formActoin} className="space-y-4">
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
              name="email"
              className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none `}
              placeholder="you@example.com"
            />
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
                name="password"
                className={`block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none pr-10 `}
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
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <LogIn className="w-5 h-5" />
            )}
            {!isPending && "LogIn"}
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
