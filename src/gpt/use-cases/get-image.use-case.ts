import * as path from 'path';
import * as fs from 'fs';
import { NotFoundException } from '@nestjs/common';

export const getImageUseCase = (fileId: string) => {
    const filePath = path.resolve(__dirname, '../../../generated/images', `${fileId}.png`);
    const wasFound = fs.existsSync(filePath);
    if(!wasFound) throw new NotFoundException(`File ${fileId} not found`);
    console.log({filePath})
    return filePath;
}