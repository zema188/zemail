import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const password = body.password;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.users.create({
            data: {
                login: body.login,
                name: body.name,
                password: hashedPassword,
            },
        });
        return { user }

    } catch (error) {
        if(error.code === 'P2002') {
            return { error: 'Этот логин уже используется. Пожалуйста, выберите другой логин.' }
        }
        return { error: "Произошла неизвестная ошибка, повторите попытку" }
    }
});
