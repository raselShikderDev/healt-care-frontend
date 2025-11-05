type LoginFormInputs = {
  email: string;
  password: string;
};

const loginUser = async (payload: LoginFormInputs) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    const data = await res.json();
    // console.log("[In login.tsx] data", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default loginUser;
