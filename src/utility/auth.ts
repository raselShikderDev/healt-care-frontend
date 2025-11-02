const checkAuthStatus = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/my-profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const data = await res.json();
        if (!data.ok) {
            throw new Error("Failed to fetch authentications data")
        }
        console.log(data);
        return {
            isAuthenticated: true,
            user: data.data
        }
    } catch (error) {
        console.error(error);
        return {
            isAuthenticated: false,
            user: false
        }

    }
}

export default checkAuthStatus