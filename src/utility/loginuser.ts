type LoginFormInputs = {
  email: string;
  password: string;
};

const loginUser = async (payload: LoginFormInputs) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
      {
        //   const res = await fetch(`http://localhost:5000/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      }
    );



    const data = await res.json();
    console.log(data);
    if (data.success) {
      return data
    }
    return null
  } catch (error) {
    console.error(error);
  }
}

export default loginUser