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
        const { start, end, interval } = req.query;

        // Default values
        const defaultStart = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];
        const defaultEnd = new Date().toISOString().split('T')[0];
        const defaultInterval = '1h';

        const period1 = start || defaultStart;
        const period2 = end || defaultEnd;
        const chosenInterval = interval || defaultInterval;

        // Fetch historical data
        const btcHistory = await yahooFinance.historical('BTC-USD', {
            period1,
            period2,
            interval: chosenInterval
        });

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
