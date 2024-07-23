const ChatHistory = require("../models/ChatHistory");
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const initialpmt = `
Your task is to ansewer the user and summarise it.
Avoid technical jargon and explain it in the simplest of words and grammar.
Your task is to Format the answer given to \n for every sentence.
Do not format your answers in markdown.
Do not include asterisks in your answers.
`;


// Get chat history by userId
const getChatByUserId = async (req, res) => {
    const userId = req.params.userId;
    try {
        const chatHistory = await ChatHistory.getChatByUserId(userId);
        if (!chatHistory.length) {
            return res.status(404).send("Chat history not found");
        }
        res.json({ chatMessages: chatHistory });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving chat history");
    }
};


// Save chat
const saveChat = async (req, res) => {
    const { userId, chatMessages } = req.body;

    try {
        await ChatHistory.saveChat(userId, chatMessages);
        res.status(200).send("Chat history saved successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error saving chat history");
    }
};

// Generate response using Gemini API
const generateGeminiResponse = async (req, res) => {
    const message = req.body.prompt;
    const history = req.body.history || [];

    console.log(history)
    try {
        const chat = model.startChat({
            history: [
                {
                  role: "user",
                  parts: [{ text: initialpmt }],
                },
              ],
            generationConfig: {
                maxOutputTokens: 100,
            },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = await response.text();
        res.json({ text });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error generating response");
    }
};

module.exports = {
    getChatByUserId,
    saveChat,
    generateGeminiResponse,
};
