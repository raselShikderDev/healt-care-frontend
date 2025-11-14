import { serverFetch } from "@/lib/serverFetch"
import z, { json } from "zod"

const creatSpecialitiesZodSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 character")
})

export const getSpecilites = async () => {
    try {
        const res = await serverFetch.get("/specialties")

        const result = await res.json()
        return result
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === "development"
                ? error.message
                : "Failed to get specilities"
                }`,
        }
    }
}


export const createSpecilites = async (_prevData: any, formData: FormData) => {
    try {
        const payload = {
            title: formData.get("title") as string
        }

        const validatedData = creatSpecialitiesZodSchema.safeParse(payload)

        if (!validatedData.success) {
            return {
                success: false,
                errors: validatedData.error.issues.map((issue) => {
                    return {
                        feild: issue.path[0],
                        message: issue.message,
                    };
                }),
            };
        }
        const newFormData = new FormData()

        newFormData.append("data", JSON.stringify(validatedData))
        if (formData.get("file")) {
            newFormData.append("file", formData.get("file") as Blob)
        }


        const res = await serverFetch.post("/specialties", {
            body: newFormData,
        })

        const result = await res.json()

        return result

    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === "development"
                ? error.message
                : "Failed to create specilities"
                }`,
        }
    }




}

export const deleteSpecilites = async (id: string) => {
     try {
        const res = await serverFetch.delete(`/specialties/${id}`)

        const result = await res.json()
        return result
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === "development"
                ? error.message
                : "Failed to delete specilities"
                }`,
        }
    }
 }