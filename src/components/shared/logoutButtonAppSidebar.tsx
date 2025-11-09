import { logOutUser } from "@/services/auth/logoutUser";
import { Button } from "../ui/button";

const LogoutButtonAppSidebar = () => {
  return (
    <Button
      variant={"destructive"}
      className="w-full py-2 font-semibold text-center cursor-pointer"
      onClick={logOutUser}
    >
      logout
    </Button>
  );
};

export default LogoutButtonAppSidebar;
