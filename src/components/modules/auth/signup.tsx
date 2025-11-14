/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock } from "lucide-react";
import React, { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { signupPatient } from "@/services/auth/signupPatient";
import { toast } from "react-toastify";
import getInputFeildError from "@/lib/getInputFeildError";
import InputFeildError from "@/components/shared/InputFeildError";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);

  const [state, formActoin, isPending] = useActionState(signupPatient, null);
  console.log(state);



  useEffect(() => {
      if (state && !state.success && state.message) {
        toast.error(state.message || "Somthing went wrong! SignUp failed");
      }
      if (state && state.success && state.message) {
        toast.success(state.message || "Account successfully created");
      }
    }, [state]);
  

  return (
    <form action={formActoin} className="space-y-5">
      <FieldGroup className="space-y-4">
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input id="name" name="name" type="text" placeholder="John Doe" />
          {/* {getInputFeildError("name", state) && (
            <FieldDescription className="text-red-600">
              error {getInputFeildError("name", state)}
            </FieldDescription>
          )} */}
          <InputFeildError feild="name" state={state} />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
          />
         
          <InputFeildError feild="email" state={state} />
        </Field>

        {/* Password Field */}
        <Field>
          <Label htmlFor="password">Password</Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="pl-10"
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 cursor-pointer right-0 pr-3 flex items-center"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </Button>
          </div>
          <InputFeildError feild="password" state={state} />
        </Field>

        {/* Confirm Password Field */}
        <Field>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={confirmShowPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="pl-10"
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => setConfirmShowPassword((prev) => !prev)}
              className="absolute inset-y-0 cursor-pointer right-0 pr-3 flex items-center"
            >
              {confirmShowPassword ? <EyeOff /> : <Eye />}
            </Button>
          </div>
          {/* {getInputFeildError("confirmPassword", state) && (
            <FieldDescription className="text-red-600">
              error {getInputFeildError("confirmPassword", state)}
            </FieldDescription>
          )} */}
          <InputFeildError feild="confirmPassword" state={state} />
        </Field>

        <FieldGroup>
          <Field>
            <Button
              disabled={isPending}
              type="submit"
              className="w-full cursor-pointer"
            >
              Create Account
            </Button>

            <FieldDescription className="text-center pt-2">
              Already have an account? <Link href="/login">Sign in</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
}
