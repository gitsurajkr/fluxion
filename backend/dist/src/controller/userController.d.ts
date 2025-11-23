import { Request, Response } from "express";
declare class UserController {
    RegisterUser(req: Request, res: Response): Promise<void>;
    LoginUser(req: Request, res: Response): Promise<void>;
    LogoutUser(req: Request, res: Response): Promise<void>;
    getUserProfile(req: Request, res: Response): Promise<void>;
    updateUserProfile(req: Request, res: Response): Promise<void>;
    deleteUserAccount(req: Request, res: Response): Promise<void>;
    getUserById(req: Request, res: Response): Promise<void>;
    updateUserRole(req: Request, res: Response): Promise<void>;
}
declare const _default: UserController;
export default _default;
//# sourceMappingURL=userController.d.ts.map