import {  ZodObject } from "zod"



export const zodValidator = <T>(paylaod: T, schema: ZodObject) => {
    const validatedData = schema.safeParse(paylaod)

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
    return {
        success: true,
        data:validatedData.data
    }
}