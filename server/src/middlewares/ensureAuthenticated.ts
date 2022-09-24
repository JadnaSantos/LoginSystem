import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";



export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { authorization } = request.headers

    if (!authorization) {
        return response.status(401).json({
            message: "Token is missing"
        })
    }

    const [, token] = authorization.split("")

    try {
        verify(token, process.env.SECRET_KEY)

        return next()
    } catch (error) {
        return response.status(401).json({
            error: 'Token invalid'
        });
    }
}