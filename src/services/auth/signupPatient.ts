/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import z from "zod";
import { logInUser } from "./logInUser";

const signUpPatientValidationSchema = z
  .object({
    name: z.string().nonempty("Name is required"),
    email: z.email().nonempty("Email is required"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, { error: "Password must be at least 8 character" })
      .max(30, { error: "Password must be at most 30 character" }),
    confirmPassword: z
      .string()
      .nonempty("Password is required")
      .min(8, { error: "Confirm password must be at least 8 character" })
      .max(30, { error: "Confirm password must be at most 30 character" }),
  })
  .refine((data: any) => data.password === data.confirmPassword, {
    message: "Password does not match",
  });

export const signupPatient = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  console.log({ confirmPass: formData.get("confirmPassword") });

  try {
    const validationData = {
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name"),
      confirmPassword:formData.get("confirmPassword")
    };

    const validatedFeild = signUpPatientValidationSchema.safeParse(validationData);

    if (!validatedFeild.success) {
      return {
        success: false,
        errors: validatedFeild.error.issues.map((issue) => {
          return {
            feild: issue.path[0],
            message: issue.message,
          };
        }),
      };
    }

    const signUpData = {
      patient: {
        email: formData.get("email"),
        name: formData.get("name"),
      },
      password: formData.get("password"),
    };

    console.log({ signUpData });

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(signUpData));

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/create-patient`,
      {
        method: "POST",
        body: newFormData,
      }
    );

    const data = await res.json();

    if (data.success) {
      await logInUser(_currentState, formData);
    }
    return res;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.error(error);
     return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "SignUp failed! Please try again."
      }`,
    };
  }
};
