"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";

type LoginFormInputs = {
    email: string;
    password: string;
    remember: boolean;
};

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data: LoginFormInputs) => {
        console.log("Form Data:", data);
        // Here you can handle API login
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
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </Button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Remember me & forgot password */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2">
                            <Input
                                type="checkbox"
                                {...register("remember")}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            Remember me
                        </label>
                        <Link href="#" className="text-blue-600 hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    {/* Login button */}
                    <Button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                    >
                        Login
                    </Button>
                </form>

                {/* Optional register link */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <Link href="#" className="text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
