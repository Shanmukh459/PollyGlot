import OpenAI from "openai"

export const translateText = async (
  text: string,
  language: string
): Promise<string | null> => {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  })

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that translates text.",
        },
        {
          role: "user",
          content: `Translate the following text to ${language}: '${text}' and only return the translation without any additional text.`,
        },
      ],
    })
    const content = response.choices?.[0]?.message?.content
    return content ? content.trim() : null
  } catch (error) {
    console.error("API Error:", error)
    return null
  }
}
