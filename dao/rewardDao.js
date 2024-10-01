const { RBTree } = require('bintrees');
const Reward = require('../model/RewardRecord');

class RewardDao {
    constructor() {
        // Map to track payer balances for O(1) access and update
        this.payerBalance = new Map();  // { payer: totalPoints }

        // Red-Black Tree to maintain sorted rewards by timestamp
        this.sortedRewards = new RBTree((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        this.sortedRewardsMapCount = 0;
    }

    /**
     * Save a reward while keeping it sorted by timestamp.
     * @param {Object} reward - The reward object with payer, points, and timestamp.
     */
    createReward(payer, points, timestamp) {
        const newReward = new Reward(payer, points, timestamp);
        // Update payer balance
        if (!this.payerBalance.has(payer)) {
            this.payerBalance.set(payer, 0);
        }
        this.payerBalance.set(payer, this.payerBalance.get(payer) + points);

        // Insert the reward into the Red-Black Tree, which keeps it sorted by timestamp
        this.sortedRewards.insert(newReward);
        this.sortedRewardsMapCount++;     
        return newReward;
    }
    /**
     * Get the total points balance for each payer.
     * @returns {Map} - Map of payer balances.
     */
    getPointsBalance() {
        return this.payerBalance;
    }
    /**
     * Spend points using FIFO (rewards sorted by timestamp).
     * @param {number} pointsToSpend - The number of points to spend.
     * @returns {Map} - Breakdown of points deducted from each payer.
     */
    spendPoints(pointsToSpend) {
        let remainingPoints = pointsToSpend;
        const spentPointsMap = new Map();
        // Process rewards in FIFO order
        while (remainingPoints > 0 && this.sortedRewardsMapCount > 0) {
            const oldestReward = this.sortedRewards.min();  // Get the oldest reward
            const pointsSpent = Math.min(oldestReward.points, remainingPoints);  // Points to spend from this reward

            // Deduct points from the reward
            oldestReward.points -= pointsSpent;
            remainingPoints -= pointsSpent;

            // Update payer balance
            this.payerBalance.set(
                oldestReward.payer,
                this.payerBalance.get(oldestReward.payer) - pointsSpent
            );


            // Record the spent points for this payer
            if (!spentPointsMap.has(oldestReward.payer)) {
                spentPointsMap.set(oldestReward.payer, 0);
            }
            spentPointsMap.set(oldestReward.payer, spentPointsMap.get(oldestReward.payer) - pointsSpent);

            // Remove reward if all points are spent
            if (oldestReward.points === 0) {
                this.sortedRewards.remove(oldestReward);
                this.sortedRewardsMapCount--;
            }
        }

        return spentPointsMap;
    }
}
    
module.exports = RewardDao;
