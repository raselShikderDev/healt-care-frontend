'use server'

import { serverFetch } from "@/lib/serverFetch";


export async function getDoctorOwnSchedules(queryString: any) {

    try {
        const res = await serverFetch.get(`/doctor-schedule/my-schedules${queryString ? `?${queryString}` : ""}`);
        const data = await res.json();

return data
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === "development"
                ? error.message
                : "Something went wrong"
                }`,
        };
    }
};

export async function getAvailableSchedules() {

    try {
        const res = await serverFetch.get(`/schedule`);
        const data = await res.json();
        return data

    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === "development"
                ? error.message
                : "Something went wrong"
                }`,
        };
    }
};


export async function createDoctorschedule(scheduleIds: string[]) {
    try {
        const res = await serverFetch.post(`/doctor-schedule`, {
            body: JSON.stringify(scheduleIds),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();


    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === "development"
                ? error.message
                : "Something went wrong"
                }`,
        };
    }
}


export async function deleteDoctorOwnschedule(scheduleId: string) {
    try {
        const res = await serverFetch.delete(`/doctor-schedule/${scheduleId}`);
        const data = await res.json();

        return {
            success: data.success,
            message: data.message || "Faild to remove schedule"
        }

    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === "development"
                ? error.message
                : "Something went wrong"
                }`,
        };
    }
}