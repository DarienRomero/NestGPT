import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto } from './dtos';
import OpenAI from 'openai';
import { prosConsDicusserUseCase } from './use-cases/pros-cons-discusser.use-case';
import { prosConsDicusserStreamUseCase } from './use-cases/pros-cons-stream.use-case';
import { TranslateDto } from './dtos/translate.dto';
import { translateUseCase } from './use-cases/translate.use-case';
import { TextToAudioDto } from './dtos/text-to-audio.dto';
import { textToAudioUseCase } from './use-cases/text-to-audio.use-case';
import { getAudioUseCase } from './use-cases/get-audio.use-case';
import { audioToTextUseCase } from './use-cases/audio-to-text.use-case';

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

    async translate(translateDto: TranslateDto){
        return await translateUseCase(this.openai, {
            prompt: translateDto.prompt,
            lang: translateDto.lang
        });
    }

    async textToAudio({prompt, voice}: TextToAudioDto){
        return await textToAudioUseCase(this.openai, {
            prompt: prompt,
            voice: voice
        });
    }
    async getAudio(fileId: string){
        return getAudioUseCase(fileId);
    }

    async audioToText(audioFile: Express.Multer.File, prompt?: string){
        return await audioToTextUseCase(this.openai, {audioFile, prompt})
    }
}
