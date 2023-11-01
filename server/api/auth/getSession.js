import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler( async (event) => {
    const sessionTokenFromCookie = getCookie(event, 'sessionToken')
    if(!sessionTokenFromCookie) {
        return { token: "invalid token" }
    }
    try {
        const response = await prisma.sessions.findUnique({
            where: {
                session_token: sessionTokenFromCookie
            }
        })
        if(response) {
            return { token: "valid token" }
        } else {
            return { token: "invalid token" }
        }
    } catch(err) {
        console.error(err)
        return { error: "Произошла ошибка" }
    }
})