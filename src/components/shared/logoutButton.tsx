import { logOutUser } from "@/services/auth/logoutUser";
import { Button } from "../ui/button";

const LogoutButton = () => {
  return (
    <Button
      variant={"destructive"}
      className="hidden md:inline-flex cursor-pointer"
      onClick={logOutUser}
    >
      logout
    </Button>
  );
};

export default LogoutButton;
