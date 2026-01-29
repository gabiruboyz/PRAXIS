
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getInclusiveAdaptation = async (
  activityContent: string,
  studentProfile: string
) => {
  const prompt = `
    Como um especialista em educação inclusiva, adapte a seguinte atividade pedagógica para um aluno com o seguinte perfil:
    
    ATIVIDADE ORIGINAL:
    ${activityContent}
    
    PERFIL DO ALUNO:
    ${studentProfile}
    
    Gere 3 sugestões de adaptações baseadas no Desenho Universal para a Aprendizagem (DUA), focando em:
    1. Meios de representação
    2. Meios de ação e expressão
    3. Meios de engajamento
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING, description: "Categoria da adaptação (Ex: Representação, Expressão)" },
              content: { type: Type.STRING, description: "Descrição detalhada da sugestão pedagógica" }
            },
            required: ["type", "content"]
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Erro ao gerar adaptação:", error);
    return [];
  }
};
