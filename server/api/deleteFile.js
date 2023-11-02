import { writeFile, unlink } from 'fs/promises';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const filePathToDelete = body.filePath; 

        const response = await unlink(`public/${filePathToDelete}`);

        return { sucsess: true }
    } catch(err) {
        console.error(err)
        return {error: 'Произошла ошибка'}
    }
});