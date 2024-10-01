/*This file sets up the Express server, 
routing requests to the appropriate controller methods. 
It also starts the server on port 8000.*/
const express = require('express');
const RewardController = require('./controller/RewardController');

const app = express();
const port = 8000;

const rewardController = new RewardController();

app.use(express.json());

app.post('/add', (req, res) => rewardController.addReward(req, res));
app.post('/spend', (req, res) => rewardController.spendPoints(req, res));
app.get('/balance', (req, res) => rewardController.getPointsBalance(req, res));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});