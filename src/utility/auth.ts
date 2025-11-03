const checkAuthStatus = async () => {
  console.log("getting the profile");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/my-profile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    console.log("[res in auth.ts] res: ", res);
    const data = await res.json();
    console.log("[res in auth.ts] data: ", data);
    if (!data.success) {
      throw new Error("Failed to fetch authentications data");
    }
    console.log(data);
    return {
      isAuthenticated: true,
      user: data.data,
    };
  } catch (error) {
    console.error(error);
    return {
      isAuthenticated: false,
      user: false,
    };
  }
};

export default checkAuthStatus;
