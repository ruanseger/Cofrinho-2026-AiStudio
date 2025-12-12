import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getSavingsAdvice = async (): Promise<string> => {
  if (!apiKey) {
    return "API Key não configurada. Por favor, configure a chave da API para receber dicas.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Atue como um especialista em finanças pessoais focado no contexto brasileiro.
      O usuário quer economizar R$ 30.000,00 começando em 1º de Janeiro de 2026.
      Ele já está usando o método da tabela (cofre numerado).
      
      Forneça 3 estratégias criativas e não óbvias para complementar esse esforço.
      Mantenha o tom motivador, prático e conciso. Use formatação Markdown.
      Foque em redução de custos ocultos, renda extra rápida ou gamificação de hábitos.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });

    return response.text || "Não foi possível gerar dicas no momento.";
  } catch (error) {
    console.error("Error fetching advice:", error);
    return "Ocorreu um erro ao buscar dicas. Tente novamente mais tarde.";
  }
};