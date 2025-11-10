import { UserRole } from "@/lib/authUtils";

export interface IUserInfo {
    name:string;
    role:UserRole;
    email:string;
}