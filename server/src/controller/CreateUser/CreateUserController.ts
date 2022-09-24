import { Request, Response } from "express";
import { client } from "../../prisma/client";
import { CreateUser } from "./CreateUser";


class CreateUserController {
    async index(request: Request, response: Response) {
        const users = await client.user.findMany();

        return response.json({ users })
    }


    async handle(request: Request, response: Response) {
        const { username, name, password } = request.body

        const createUser = new CreateUser()

        const user = await createUser.execute({
            username,
            name,
            password
        })

        return response.json({ user })
    }
}

export { CreateUserController }