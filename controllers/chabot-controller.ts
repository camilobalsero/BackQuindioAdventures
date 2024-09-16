import express from "express";
import { API_KEY_GEMINI, START_CHAT, GENERATION_CONFIG } from "../config/config-db";
import { GoogleGenerativeAI, GenerativeModel, Part, Content } from "@google/generative-ai";

if (!API_KEY_GEMINI) {
  throw new Error("API_KEY_GEMINI no está definido");
}

const genAI = new GoogleGenerativeAI(API_KEY_GEMINI);
const model: GenerativeModel = genAI.getGenerativeModel({ model: "gemini-pro" });

const router = express.Router();

// Define a set of keywords or phrases related to your page
const relevantKeywords = [
  "chalets", "reservas","hola", "planes vacacionales", "QuindioAdventures", 
  "servicios","cual es la misión", "cual es la visión", "cual es la mision","cual es la vision","descripcion general","descripción general","como reservar un plan vacacional","como reservar un chalet","que me puede ofrecer la pagina","quindioadventures","que puedo hacer en la pagina"
  ,"como puedo reservar un chalet","como puedo reservar un plan vacacional","como se reserva un chalet","como se reserva un plan vacacional","que metodos de pago","como puedo pagar","como pagar","metodos de pago","como se hace una reserva","como hacer una reserva","como registro mi chalet","como registro mi plan vacacional","como registro un chalet","como registro un plan vacacional","que puedo hacer en el quindio","que puedo hacer en el Quindio","que puedo hacer en quindioadventures","que puedo hacer en QuindioAdventures","como cierro sesion en la pagina","como cierro sesión","como cerrar sesion","como cerrar sesión",""
];

// Function to check if the question is relevant
const isRelevantQuestion = (question: string): boolean => {
  const questionLower = question.toLowerCase();
  return relevantKeywords.some(keyword => questionLower.includes(keyword));
};

router.post('/', async (req, res) => {
  const { question } = req.body;

  const history = [
    {
      "role": "user",
      "parts": "Esta es una conversación sobre chalets y planes vacacionales disponibles en QuindioAdventures."
    }
  ]

  // Verificación de que 'history' y 'question' no sean indefinidos
  if (!history || !question) {
    return res.status(400).json({ error: "Historial y pregunta son necesarios." });
  }

  // Check if the question is relevant
  if (!isRelevantQuestion(question)) {
    return res.status(200).json({ response: "Lo siento, no puedo responder preguntas sobre temas fuera de la página web." });
  }

  // Función para formatear el historial a la estructura esperada
  const formatHistory = (entries: any[]): Content[] => {
    return entries.map(entry => ({
      role: entry.role,
      parts: [{ text: entry.parts }] as Part[]
    }));
  };

  const formattedStartChat = formatHistory(START_CHAT);
  const formattedHistory = formatHistory(history);
  const historyChat = formattedStartChat.concat(formattedHistory);

  try {
    const chat = model.startChat({
      history: historyChat,
      generationConfig: GENERATION_CONFIG,
    });

    const sendQuestion = await chat.sendMessage(question);
    const response = await sendQuestion.response;
    const text = response.text();

    return res.status(200).json({ response: text });
  } catch (error) {
    return res.status(500).json({ error: "Ocurrió un error al procesar la solicitud." });
  }
});

export default router;