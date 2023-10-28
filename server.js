const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
let visitors = 0;

// Middleware to count visitors
app.use((req, res, next) => {
    visitors++;
    console.log(`Number of visitors: ${visitors}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Welcome agian');
});

// Endpoint to get the number of visitors
app.get('/visitors', (req, res) => {
    res.json({ visitors: visitors });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
