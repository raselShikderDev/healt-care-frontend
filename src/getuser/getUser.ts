"use server"

export const getMyProfile = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/my-profile`, {
      method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      credentials: "include",
    });

    const data = await res.json();
    if (data.success) {
      return data;
    }
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
