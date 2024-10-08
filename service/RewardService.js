const RewardDao = require('../dao/RewardDao');

class RewardService {
    constructor() {
        this.rewardDao = new RewardDao();
    }

    /**
     * Add a new transaction.
     * @param {string} payer - The name of the payer.
     * @param {number} points - The points being added.
     * @param {Date} timestamp - The timestamp of the transaction.
     */
    addReward(payer, points, timestamp) {
        const reward = { payer, points, timestamp };
        
        const newReward = this.rewardDao.createReward(payer, points, timestamp);
        return newReward;
    }
    /**
     * Get the total points balance for each payer.
     * @returns {Map} - Map of payer balances.
     */
    getPointsBalance() {
        const map = this.rewardDao.getPointsBalance();
        return map;
    }
    /**
     * Calculate the total points available from all payers.
     * @returns {number} - The total available points.
     */
    getTotalPoints() {
        const balance = this.rewardDao.getPointsBalance();
        let totalPoints = 0;
        balance.forEach(points => {
            totalPoints += points;
        });
        return totalPoints;
    }
    /**
     * Spend points using FIFO.
     * @param {number} pointsToSpend - The number of points to spend.
     * @returns {Array} - Breakdown of points deducted from each payer.
     */
    spendPoints(pointsToSpend) {
        return this.rewardDao.spendPoints(pointsToSpend);
    }
}

module.exports = RewardService;