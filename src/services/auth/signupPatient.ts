/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const signupPatient = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
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
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: newFormData,
        // credentials: "include",
      }
    ).then((res) => res.json());

    console.log({ res });
    return res;
  } catch (error) {
    console.log(error);
    return { error: "Signing Up is failed" };
  }
};
