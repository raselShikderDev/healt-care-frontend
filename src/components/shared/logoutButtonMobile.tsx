import { logOutUser } from "@/services/auth/logoutUser";
import { Button } from "../ui/button";

const LogoutButtonMobile = () => {
  return (
    <Button
      variant={"destructive"}
      className="inline-flex cursor-pointer"
      onClick={logOutUser}
    >
      logout
    </Button>
  );
};

export default LogoutButtonMobile;
