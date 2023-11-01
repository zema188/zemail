import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const sessionTokenFromCookie = getCookie(event, 'sessionToken')
    try {
        const response = await prisma.users.findFirst({
            where: {
                sessions: {
                    some: {
                        session_token: sessionTokenFromCookie
                    }
                }
            },
            select: {
                name: true,
                login: true
            }
        })
        if(response) {
            const user = {...response }
            return { user }
        }
        return null
    } catch(err) {
        console.error(err)
    }
})