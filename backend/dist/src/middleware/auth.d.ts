import { Request, Response, NextFunction } from 'express';
declare class AuthMiddleware {
    static authenticateToken(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
}
export default AuthMiddleware;
//# sourceMappingURL=auth.d.ts.map