const { GoogleGenerativeAI } = require("@google/generative-ai");
import { Request, Response } from "express";

// Accede a tu clave API como una variable de entorno
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const chatbotController = async (req: Request, res: Response) => {
  const userMessage = req.body.message;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "" }],
        },
        {
          role: "model",
          parts: [{ text: "" }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 150,
      },
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const text = await response.text();

    res.json({ response: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
};


export default chatbotController;
