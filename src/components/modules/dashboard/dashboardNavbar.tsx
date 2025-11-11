import { getUserInfo } from "@/services/auth/getUserInfo";
import { IUserInfo } from "@/types/user.interface";
import DashboardNavbarContent from "@/components/modules/dashboard/DashboardNavbarContent";
import { getDefaultDashboard } from "@/lib/authUtils";
import { NavSection } from "@/types/dashboard.interface";
import { getNavItemsByRole } from "@/lib/navItems.config";

const DashboardNavbar = async () => {
  const userInfo = (await getUserInfo()) as IUserInfo;
  const dashboardHome = getDefaultDashboard(userInfo.role);
  const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};
export default DashboardNavbar;
