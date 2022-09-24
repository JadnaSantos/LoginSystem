import { compare } from 'bcryptjs'
import { client } from "../../prisma/client";
import { sign } from "jsonwebtoken";


interface IRequest {
    username: string;
    password: string;
}

class AuthenticateUser {

    async execute({ username, password }: IRequest) {

        const userAlreadyExists = await client.user.findFirst({
            where: {
                username
            }
        })

        if (!userAlreadyExists) {
            throw new Error('User or password incorret!')
        }

        const passwordMatch = await compare(password, userAlreadyExists.password)

        if (!passwordMatch) {
            throw new Error('User or password incorret!')
        }

        const token = sign({ userAlreadyExists: userAlreadyExists.id }, process.env.SECRET_KEY, {
            expiresIn: '20s'
        })

        return { token }
    }
}


export { AuthenticateUser }