import z from "zod";

export const logInUserSchema = z.object({
  email: z.email({ error: "Email is required" }),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, { error: "Password must be at least 8 character" })
    .max(30, { error: "Password must be at most 30 character" }),
});


export const signUpPatientValidationSchema = z
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