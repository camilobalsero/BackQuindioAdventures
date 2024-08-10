import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization'];
    if (headerToken && headerToken.startsWith('Bearer ')) {
        const bearerToken = headerToken.slice(7);
        try {
            const tokenValido = jwt.verify(bearerToken, 'camilo') as { email?: string };
            if (tokenValido.email) {
                res.locals.user = tokenValido;
                next();
            } else {
                res.status(400).json({ message: "Email no disponible en el token" });
            }
        } catch (error) {
            console.error("Error al verificar el token:", error);
            res.status(400).json({ status: 'Acceso denegado' });
        }
    } else {
        res.status(400).json({ status: 'Acceso denegado: Token no proporcionado' });
    }
};

export default validateToken;
