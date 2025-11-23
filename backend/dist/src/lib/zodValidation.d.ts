import { z } from "zod";
declare class ZodSchemas {
    static RegisterUser: z.ZodObject<{
        email: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        role: z.ZodDefault<z.ZodString>;
        password: z.ZodString;
    }, z.core.$strip>;
    static LoginUser: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, z.core.$strip>;
    static UpdateUser: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        password: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}
export default ZodSchemas;
export type RegisterUserType = z.infer<typeof ZodSchemas.RegisterUser>;
export type LoginUserType = z.infer<typeof ZodSchemas.LoginUser>;
export type UpdateUserType = z.infer<typeof ZodSchemas.UpdateUser>;
//# sourceMappingURL=zodValidation.d.ts.map