import { getUserInfo } from "@/services/auth/getUserInfo";
import DashBoardSidebarContent from "./DashBoardSidebarContent";
import { IUserInfo } from "@/types/user.interface";
import { getDefaultDashboard } from "@/lib/authUtils";
import { NavSection } from "@/types/dashboard.interface";
import { getNavItemsByRole } from "@/lib/navItems.config";

const DashboardSidebar = async () => {
  const userInfo = (await getUserInfo()) as IUserInfo;
  console.log({ userInfo });

  const dashboardHome = getDefaultDashboard(userInfo.role);
  const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
  return (
    <DashBoardSidebarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardSidebar;
