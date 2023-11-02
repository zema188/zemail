import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler( async (event) => {

    const sessionTokenFromCookie = getCookie(event, 'sessionToken')
    if(!sessionTokenFromCookie) {
        return { token: "invalid token" }
    }
    try {
        const session = await prisma.sessions.findUnique({
            where: {
                session_token: sessionTokenFromCookie
            }
        })
        if(session) {
            const currentTime = new Date();
            const sessionExpiryTime = new Date(session.created_at);
            sessionExpiryTime.setSeconds(sessionExpiryTime.getSeconds() + 3600000); // Добавляем 20 секунд к времени создания
            
            if (currentTime > sessionExpiryTime) {
                await prisma.sessions.delete({
                    where: {
                        id: session.id,
                    },
                });
                return { token: "invalid token" }
            }
            return { token: "valid token" }

        } else {
            return { token: "invalid token" }
        }
    } catch(err) {
        console.error(err)
        return { error: "Произошла ошибка" }
    }
})