const { GoogleGenerativeAI } = require("@google/generative-ai");

export const sendMessageToAI = async (prompt: string) => {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        const result = await model.generateContent(prompt);

        return result.response.text()
    } catch (error) {
        console.error('Error communicating with Gemini AI:', error);
        throw new Error('Failed to communicate with AI.');
    }
};
