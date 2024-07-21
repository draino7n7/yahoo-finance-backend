const express = require('express');
const cors = require('cors');
const yfinance = require('yfinance');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/api/bitcoin', async (req, res) => {
    try {
        const btc = yfinance('BTC-USD');
        const btcHistory = await btc.history({ period: 'max' });
        res.json(btcHistory);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
