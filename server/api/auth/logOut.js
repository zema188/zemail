import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const sessionTokenFromCookie = getCookie(event, 'sessionToken')
    if(!sessionTokenFromCookie) {
        return { confirmed: 'user has logged out' }
    }
    try {
        const response = await prisma.sessions.delete({
            where: {
                session_token: sessionTokenFromCookie,
            },
        });
        if(response) {
            return { confirmed: 'user has logged out' }
        } else {
            return { error: "Произошла неизвестная ошибка, повторите попытку" }
        }

    } catch (error) {
        return { error: "Произошла неизвестная ошибка, повторите попытку" }
    }
});
