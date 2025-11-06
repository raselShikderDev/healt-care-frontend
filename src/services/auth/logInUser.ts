/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import z from "zod"

const logInUserSchema = z.object({
  email: z.email({ error: "Email is required" }),
  password: z.string().nonempty("Password is required").min(8, {error:"Password must be at least 8 character"}).max(30, {error:"Password must be at most 30 character"}),
});



export const logInUser = async (_currentState: any, formData: any) => {
  const signInData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validatedFeild = logInUserSchema.safeParse(signInData)

  if (!validatedFeild.success) {
    return{
      success:false,
      errors:validatedFeild.error.issues.map(issue =>{
        return{
          feild:issue.path[0],
          message:issue.message,
        }
      })
    }
  }

console.log({validatedFeild});

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFeild.data),
      credentials: "include",
    }).then((res) => res.json());

    return res;
  } catch (error) {
    console.error(error);
    return { error: "Login failed" };
  }
};
