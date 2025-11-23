import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

class AuthMiddleware {
    static authenticateToken(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies.auth_token;

        if(!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "JWT_SECRET is not configured" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string; email: string };
            req.user = { id: decoded.userId, email: decoded.email };
            next();
        } catch (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
    }
}

export default AuthMiddleware;  