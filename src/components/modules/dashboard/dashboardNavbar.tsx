import { getUserInfo } from "@/services/auth/getUserInfo"
import { IUserInfo } from "@/types/user.interface"
import DashboardNavbarContent from "@/components/modules/dashboard/DashboardNavbarContent"

const DashboardNavbar = async () => {
    const userInfo = await getUserInfo() as IUserInfo
    return <DashboardNavbarContent userInfo={userInfo} />
}

export default DashboardNavbar