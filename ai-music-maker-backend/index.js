const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/generate-lyrics', async (req, res) => {
    try {
        const { theme, language } = req.body;
        const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
            prompt: `Generate lyrics about ${theme} in ${language}`,
            max_tokens: 100,
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
