"use client"
import { logOutUser } from "@/services/auth/logoutUser";
import { Button } from "../ui/button";

const LogoutButtonAppSidebar = () => {
  const handleLogOut = async () => {
    await logOutUser();
  };
  return (
    <Button
      variant={"destructive"}
      className="w-full py-2 font-semibold text-center cursor-pointer"
      onClick={handleLogOut}
    >
      logout
    </Button>
  );
};

export default LogoutButtonAppSidebar;
