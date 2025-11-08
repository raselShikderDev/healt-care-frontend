"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useActionState, useState } from "react";
import Link from "next/link";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { signupPatient } from "@/services/auth/signupPatient";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);

  const [state, formActoin, isPending] = useActionState(signupPatient, null);
  console.log(state);

  const getFeildError = (feildName: string) => {
    if (state && state.errors) {
      const error = state?.errors.find((err: any) => err.feild === feildName)
      if (error) {
        return error?.message
      } else {
        return null
      }

    } else {
      return null
    }
  }

  return (
    <form action={formActoin} className="space-y-5">
      <FieldGroup className="space-y-4">
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
          />
          {
            getFeildError("name") && (<FieldDescription className="text-red-600">error {getFeildError("name")}</FieldDescription>)
          }
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
          />
          {
            getFeildError("email") && (<FieldDescription className="text-red-600">error {getFeildError("email")}</FieldDescription>)
          }
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
          {
            getFeildError("password") && (<FieldDescription className="text-red-600">error {getFeildError("password")}</FieldDescription>)
          }
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
          {
            getFeildError("confirmPassword") && (<FieldDescription className="text-red-600">error {getFeildError("confirmPassword")}</FieldDescription>)
          }
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
