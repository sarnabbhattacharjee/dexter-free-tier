const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini with the API Key from Environment Variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/ask-auraa', async (req, res) => {
    try {
        // We use gemini-1.5-flash because it is the fastest and most stable for free tier
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = req.body.prompt;
        
        // Generate content
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        res.json({ response: text });
    } catch (error) {
        console.error("Gemini Error:", error);
        // This specific error message helps us debug if it happens again
        res.status(500).json({ response: "System Error: The AI model is currently unreachable. Please check the Server Logs." });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`AURAA server running on port ${PORT}`);
});
