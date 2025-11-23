import { email, z } from "zod";

class ZodSchemas {
  
  // Register Schema
  public static RegisterUser = z.object({
    email: z.string().email(),
    name: z.string().optional(),
    role: z.enum(["USER", "ADMIN"]).default("USER"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });


  // Login Schema
  public static LoginUser = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  // Update User Schema
  public static UpdateUser = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6, "Password must be at least 6 characters").optional(),
  }).refine(data => data.name !== undefined || data.password !== undefined, {
    message: "At least one field (name or password) must be provided"
  });

  // Template Schema
  public static TemplateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be a positive number"),
  thumbnailUrl: z.string().url("Thumbnail URL must be a valid URL"),
  isActive: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
  })
}

export default ZodSchemas;

// Types
export type RegisterUserType = z.infer<typeof ZodSchemas.RegisterUser>;
export type LoginUserType = z.infer<typeof ZodSchemas.LoginUser>;
export type UpdateUserType = z.infer<typeof ZodSchemas.UpdateUser>;
export type TemplateType = z.infer<typeof ZodSchemas.TemplateSchema>;
