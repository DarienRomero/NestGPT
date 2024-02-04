import OpenAI from "openai";

interface Options {
    prompt: string;
    lang: string;
  }
export const translateUseCase = async (openai: OpenAI, { prompt, lang }: Options) => {

    const response = await openai.chat.completions.create({
        messages: [
            { 
                role: "system", 
                content: `
                        Se te dará un texto y tu tarea es traducir el texto al idioma especificado
                    }
                `
            },
            {
                role: 'user',
                content: `Traduce el siguiente texto al idioma ${lang}:${ prompt }`
            }

        ],
        temperature: 0.3,
        model: "gpt-4",
        max_tokens: 500
    });

return response.choices[0].message;
}