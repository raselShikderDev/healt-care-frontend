"use client";

import { useActionState, useEffect, useState } from "react";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { logInUser } from "@/services/auth/logInUser";
import { FieldDescription } from "@/components/ui/field";
import { toast } from "react-toastify";

export type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginForm({ redirect }: { redirect?: string }) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [state, formActoin, isPending] = useActionState(logInUser, null);
  console.log({state:state?.message});

  const getFeildError = (feildName: string) => {
    if (state && state.errors) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error = state?.errors.find((err: any) => err.feild === feildName);
      return error?.message;
    } else {
      return null;
    }
  };
  

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message || "Somthing went wrong! Login failed");
    }
    if (state && state.success && state.message) {
      toast.success(state.message || "Successfully logged In");
    }
  }, [state]);


  return (
    <div className="">
      <div className="">
        <form action={formActoin} className="space-y-4">
          {redirect && <Input type="hidden" name="redirect" value={redirect} />}
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
            {getFeildError("email") && (
              <FieldDescription className="text-red-600">
                error {getFeildError("email")}
              </FieldDescription>
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
            {getFeildError("password") && (
              <FieldDescription className="text-red-600">
                {getFeildError("password")}
              </FieldDescription>
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
