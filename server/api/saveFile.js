import { writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid'; // Импортируем библиотеку uuid

export default defineEventHandler(async (event) => {
    try {
        const files = await readMultipartFormData(event);

        if (!files || files.length === 0) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Image Not Found',
            });
        }
    
        if (files[0].name === 'file') {
            const filename = uuidv4();
            const originalFilename = files[0].filename;
            const lastDotIndex = originalFilename.lastIndexOf('.');
            
            if (lastDotIndex !== -1) {
                const extension = originalFilename.substring(lastDotIndex + 1);
                const filePath = `./public/uploads/${filename}.${extension}`;
                await writeFile(filePath, files[0].data);
                return {
                    fileId: `${filename}.${extension}`,
                };
            }

        }
        
        throw createError({
            statusCode: 400,
            statusMessage: 'Image Not Found',
        });

    } catch(err) {
        console.error(err)
        return {error: 'Произошла ошибка'}
    }
});