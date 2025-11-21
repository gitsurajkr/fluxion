import { z } from "zod";

class ZodSchemas {
  
  // Register Schema
  public static RegisterUser = z.object({
    email: z.string().email(),
    name: z.string().optional(),
    role: z.string().default("USER"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  // abcdef

  // Login Schema
  public static LoginUser = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  // Update User Schema
  public static UpdateUser = z.object({
    name: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters").optional(),
  }).refine(data => data.name !== undefined || data.password !== undefined, {
    message: "At least one field (name or password) must be provided"
  });

}

export default ZodSchemas;

// Types
export type RegisterUserType = z.infer<typeof ZodSchemas.RegisterUser>;
export type LoginUserType = z.infer<typeof ZodSchemas.LoginUser>;
export type UpdateUserType = z.infer<typeof ZodSchemas.UpdateUser>;
