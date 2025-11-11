import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboard, UserRole } from "./authUtils";

export const getCommonNavItems = (role:UserRole):NavSection[]=>{
    const defaultDashboard = getDefaultDashboard(role)
     return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    role: ["PATIENT", "DOCTOR", "ADMIN"],
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    role: ["PATIENT", "DOCTOR", "ADMIN"],
                },

            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings", 
                    role: ["PATIENT"],
                },
            ],
        },
    ]
}




export const doctorNavItems: NavSection[] = [
    {
        title: "Patient Management",
        items: [
            {
                title: "Appointments",
                href: "/doctor/dashboard/appoinments",
                icon: "Calendar", // 
                badge: "3",
                role: ["DOCTOR"],
            },
            {
                title: "My Schedules",
                href: "/doctor/dashboard/my-schedules",
                icon: "Clock", // 
                role: ["DOCTOR"],
            },
            {
                title: "Prescriptions",
                href: "/doctor/dashboard/prescriptions",
                icon: "FileText", // 
                role: ["DOCTOR"],
            },
        ],
    }
]

export const patientNavItems: NavSection[] = [
    {
        title: "Appointments",
        items: [
            {
                title: "My Appointments",
                href: "/dashboard/my-appointments",
                icon: "Calendar", // 
                role: ["PATIENT"],
            },
            {
                title: "Book Appointment",
                href: "/consultation",
                icon: "ClipboardList", // 
                role: ["PATIENT"],
            },
        ],
    },
    {
        title: "Medical Records",
        items: [
            {
                title: "My Prescriptions",
                href: "/dashboard/my-prescriptions",
                icon: "FileText", // 
                role: ["PATIENT"],
            },
            {
                title: "Health Records",
                href: "/dashboard/health-records",
                icon: "Activity", // 
                role: ["PATIENT"],
            },
        ],
    },

]

export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "Admins",
                href: "/admin/dashboard/admins-management",
                icon: "Shield", // 
                role: ["ADMIN"],
            },
            {
                title: "Doctors",
                href: "/admin/dashboard/doctors-management",
                icon: "Stethoscope", // 
                role: ["ADMIN"],
            },
            {
                title: "Patients",
                href: "/admin/dashboard/patients-management",
                icon: "Users", // 
                role: ["ADMIN"],
            },
        ],
    },
    {
        title: "Hospital Management",
        items: [
            {
                title: "Appointments",
                href: "/admin/dashboard/appointments-management",
                icon: "Calendar", // 
                role: ["ADMIN"],
            },
            {
                title: "Schedules",
                href: "/admin/dashboard/schedules-management",
                icon: "Clock", // 
                role: ["ADMIN"],
            },
            {
                title: "Specialities",
                href: "/admin/dashboard/specialities-management",
                icon: "Hospital", // 
                role: ["ADMIN"],
            },
        ],
    }
]


export const getNavItemsByRole = (role:UserRole)=>{
    const commonNavItem = getCommonNavItems(role)

    switch (role) {
        case "ADMIN":
            return [...commonNavItem, ...adminNavItems]
        case "DOCTOR":
            return [...commonNavItem, ...doctorNavItems]
        case "PATIENT":
            return [...commonNavItem, ...patientNavItems]
    
        default:
            return []
    }
}