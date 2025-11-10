import { getUserInfo } from "@/services/auth/getUserInfo"
import DashBoardSidebarContent from "./DashBoardSidebarContent"
import { IUserInfo } from "@/types/user.interface"

const DashboardSidebar = async ()=>{
    const userInfo = await getUserInfo() as IUserInfo
    return(
       <DashBoardSidebarContent userInfo={userInfo}/>
    )
}


 export default DashboardSidebar