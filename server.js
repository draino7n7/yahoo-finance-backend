const express = require('express');
const cors = require('cors');
const yahooFinance = require('yahoo-finance2').default;
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Root route
app.get('/', (req, res) => {
    res.send('Hello, this is the Yahoo Finance API server.');
});

// Endpoint to fetch Bitcoin historical data from Yahoo Finance
app.get('/api/bitcoin/historical', async (req, res) => {
    try {
        const btcHistory = await yahooFinance.historical('BTC-USD', { period1: '1970-01-01', period2: new Date().toISOString().split('T')[0], interval: '1d' });
        res.json(btcHistory);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Endpoint to fetch the current Bitcoin price from Yahoo Finance
app.get('/api/bitcoin/current', async (req, res) => {
    try {
        const btcQuote = await yahooFinance.quote('BTC-USD');
        const currentPrice = btcQuote.regularMarketPrice;
        res.json({ currentPrice });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
