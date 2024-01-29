import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto } from './dtos';
import OpenAI from 'openai';
import { prosConsDicusserUseCase } from './use-cases/pros-cons-discusser.use-case';
import { prosConsDicusserStreamUseCase } from './use-cases/pros-cons-stream.use-case';

@Injectable()
export class GptService {

    private openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    })

    async orthographyCheck(orthographyDto: OrthographyDto){
        return await orthographyCheckUseCase(this.openai, {
            prompt: orthographyDto.prompt
        });
    }

    async prosConsDicusser(prosConsDiscusserDto: ProsConsDiscusserDto){
        return await prosConsDicusserUseCase(this.openai, {
            prompt: prosConsDiscusserDto.prompt
        });
    }
    async prosConsDicusserStream(prosConsDiscusserDto: ProsConsDiscusserDto){
        return await prosConsDicusserStreamUseCase(this.openai, {
            prompt: prosConsDiscusserDto.prompt
        });
    }
}
