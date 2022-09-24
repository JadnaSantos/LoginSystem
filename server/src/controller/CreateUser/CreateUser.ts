import { client } from '../../prisma/client'
import { hash } from "bcryptjs"

interface UserRequest {
    name: string;
    password: string;
    username: string;
}

class CreateUser {

    async execute({ name, password, username }: UserRequest) {

        const userAlreadyExists = await client.user.findFirst({
            where: {
                username
            }
        });

        if (userAlreadyExists) {
            throw new Error('User already exists!')
        }

        const hasPasswordHas = await hash(password, 8)

        const user = await client.user.create({
            data: {
                name,
                username,
                password: hasPasswordHas
            }
        })

        return user
    }
}


export { CreateUser }