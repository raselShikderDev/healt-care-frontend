type LoginFormInputs = {
  email: string;
  password: string;
};

const loginUser = async (payload: LoginFormInputs) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      }
    );



    const data = await res.json();
    console.log("data in loginUser.tsx: ", data);
    
    if (data && data.success) {
      console.log("[In login.tsx] data", data);
      return data
    }
    return null
  } catch (error) {
    console.error(error);
  }
}

export default loginUser