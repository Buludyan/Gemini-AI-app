import express from 'express';
import cors from 'cors';
import { sendMessageToAI } from './geminiClient';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { getAllConversations, getConversationById, saveConversation } from './db';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
dotenv.config();

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

app.post('/api/chat', async (req: Request, res: Response) => {
    const { prompt, chatId } = req.body;

    if (!prompt) {
        res.status(400).json({ error: 'Message is required.' });
        return;
    }

    try {
        getConversationById(chatId, async (conversation: any) => {
            if (!conversation) {
                conversation = {
                    id: chatId,
                    title: `Conversation ${chatId}`,
                    messages: [],
                };
            }

            let aiContext = '';
            conversation.messages.forEach((message: any) => {
                aiContext += `${message.sender}: ${message.content}\n`;
            });

            aiContext += `user: ${prompt}\n`;

            const aiMessage = await sendMessageToAI(aiContext);

            const userMessageObject = {
                id: Date.now().toString(),
                sender: 'user',
                content: prompt,
            };

            const aiMessageObject = {
                id: Date.now() + '-ai',
                sender: 'ai',
                content: aiMessage,
            };

            conversation.messages.push(userMessageObject, aiMessageObject);

            saveConversation(conversation);

            res.json(conversation);
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process the request' });
    }
});

app.get('/api/chats', (req, res) => {
    getAllConversations((conversations: any) => {
        res.json(conversations);
    });
});
