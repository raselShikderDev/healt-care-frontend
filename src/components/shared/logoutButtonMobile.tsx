"use client";

import { logOutUser } from "@/services/auth/logoutUser";
import { Button } from "../ui/button";

const LogoutButtonMobile = () => {
  const handleLogOut = async () => {
    await logOutUser();
  };
  return (
    <Button
      variant={"destructive"}
      className="inline-flex cursor-pointer"
      onClick={handleLogOut}
    >
      logout
    </Button>
  );
};

export default LogoutButtonMobile;
