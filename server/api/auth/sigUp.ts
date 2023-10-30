import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt";


const prisma = new PrismaClient()

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    const passworda = await bcrypt.hash(body.password, 12);
    console.log(passworda)
    try {
        const user = await prisma.users.create({
            data: {
                login: body.login,
                name: body.name,
                password: 'password',
            },
        })
        return {
            user: user
        }
    } catch(err) {
        console.log(err)
        return {
            error: err
        }
    }

})