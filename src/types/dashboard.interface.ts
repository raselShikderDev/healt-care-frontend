import { UserRole } from "@/lib/authUtils";

export interface INavItem{
    title:string;
    href:string;
    icon:string;
    badge?: string | number;
    descriptions?:string;
    role:UserRole[]
}


export interface NavSection {
    title?:string;
    items:INavItem[]
}