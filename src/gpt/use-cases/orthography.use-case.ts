import OpenAI from "openai";

interface Options {
    prompt: string;
}
export const orthographyCheckUseCase = async (openai: OpenAI, options: Options) => {
    
    const {prompt} = options;

    const completion = await openai.chat.completions.create({
        messages: [
            { 
                role: "system", 
                content: `
                    Te serán proveídos textos en español con posibles errores ortográficos y gramaticales,
                    Las palabras usadas deben de existir en el diccionario de la Real Academia Española,
                    Debes de responder en formato Json,
                    tu tarea es corregirlos y retornar información de las solicitudes,
                    también desde de dar un porcentaje de acierto por el usuario,
                    Si no hay errores, debes de retornar un mensaje de felicitaciones.
                    Ejemplo de salida:
                    {
                        userScore: number,
                        errors: string[], //['error->solución'],
                        message: string, //usa emojis y texto para felicitar al usuario
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
        max_tokens: 150
    });

    // console.log(completion);
    return JSON.parse(completion.choices[0].message.content)
}