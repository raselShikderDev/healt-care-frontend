/* eslint-disable @typescript-eslint/no-explicit-any */

export const logInUser = async (_currentState: any, formData: any) => {
  const signInData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInData),
      credentials: "include",
    }).then((res) => res.json());

    return res;
  } catch (error) {
    console.error(error);
    return { error: "Login failed" };
  }
};
