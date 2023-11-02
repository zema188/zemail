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
                ...body
            }
        })
        if (response) {
            return { success: true };
        } else {
            throw new Error
        }
    } catch(err) {
        console.error(err)
        return {error: 'Произошла ошибка'}
    }
})