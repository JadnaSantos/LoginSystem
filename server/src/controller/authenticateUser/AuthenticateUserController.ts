import { Request, Response } from "express";
import { AuthenticateUser } from "./AuthenticateUser";


class AuthenticateUserController {

    async handle(request: Request, response: Response) {
        const { username, password } = request.body

        const authenticateUserController = new AuthenticateUser()

        const token = await authenticateUserController.execute({
            username,
            password
        })

        return response.json(token)
    }
}

export { AuthenticateUserController }