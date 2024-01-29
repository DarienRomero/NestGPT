import OpenAI from "openai";

interface Options {
    prompt: string;
  }
export const prosConsDicusserStreamUseCase = async (openai: OpenAI, { prompt }: Options) => {

    return openai.chat.completions.create({
        stream: true,
        messages: [
            { 
                role: "system", 
                content: `
                        Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
                        la respuesta debe de ser en formato markdown,
                        los pros y contras deben de estar en una lista
                    }
                `
            },
            {
                role: 'user',
                content: prompt
            }

        ],
        temperature: 0.3,
        model: "gpt-4",
        max_tokens: 500
    });

}