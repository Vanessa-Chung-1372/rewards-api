const { v4: uuidv4 } = require('uuid');

class Reward {
    constructor(payer, points, timestamp) {
        this.id = uuidv4();  // Automatically generate a unique ID for each transaction
        this.payer = payer;
        this.points = points;
        this.timestamp = new Date(timestamp);
    }

    // Additional methods and validation if needed
}

module.exports = Reward;