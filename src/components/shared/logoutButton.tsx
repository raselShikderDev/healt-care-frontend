"use client"
import { logOutUser } from "@/services/auth/logoutUser";
import { Button } from "../ui/button";

const LogoutButton = () => {
  const handleLogOut = async () => {
    await logOutUser();
  };
  return (
    <Button
      variant={"destructive"}
      className="hidden md:inline-flex cursor-pointer"
      onClick={handleLogOut}
    >
      logout
    </Button>
  );
};

export default LogoutButton;
