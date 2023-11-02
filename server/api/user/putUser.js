import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    // const sessionTokenFromCookie = getCookie(event, 'sessionToken')
    const body = await readBody(event)
    try {
        const response = await prisma.users.update({
            where: {
                login: body.login
            },
            data: {
                name: body.name,
            }
        })
        if(response) {
            return { success: true }
        }
        return null
    } catch(err) {
        console.error(err)
        return null
    }
})