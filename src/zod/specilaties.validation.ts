import z from "zod";




export const creatSpecialitiesZodSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 character"),
});