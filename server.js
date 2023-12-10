// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

let messages = [];

app.post('/send-message', (req, res) => {
    const { name, message } = req.body;

    messages.push({ name, message });

    res.json({ messages });
});

app.get('/get-messages', (req, res) => {
    res.json({ messages });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
