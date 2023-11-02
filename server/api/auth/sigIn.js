import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid'; // Импортируем библиотеку uuid

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const login = body.login;
    const password = body.password;

    try {
        const user = await prisma.users.findUnique({
            where: {
                login: login,
            }
        });
        if (!user) {
            return { error: "Пользователь с таким логином не найден." };
        }
        const hashedPassword = user.password;
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (passwordMatch) {
            // Генерируем сессионный токен
            const sessionToken = uuidv4();

            // Создаем сессию в базе данных
            const session = await prisma.sessions.create({
                data: {
                    user_id: user.id,
                    session_token: sessionToken,
                },
            });


            // Устанавливаем сессионный токен в куки
            const cookieOptions = {
                maxAge: 3600000, // Установите срок действия куки по своему усмотрению (например, 1 час)
                httpOnly: true, // Запретить JavaScript доступ к куки
            };

            // Устанавливаем куки с сессионным токеном
            setCookie(event, 'sessionToken', sessionToken)
            return { user };
        } else {
            return { error: "Введен неверный пароль." };
        }

    } catch (error) {
        console.log(error)
        return { error: "Произошла неизвестная ошибка, повторите попытку" };
    }
});
