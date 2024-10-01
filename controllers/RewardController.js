const rewardService = require('../services/rewardService');
class RewardController {
    constructor() {
        // Instantiate the service
        this.rewardService = new rewardService();
    }

    /**
     * Add points for a payer.
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object.
     */
    addReward(req, res) {
        const { payer, points, timestamp } = req.body;

        if (!payer || typeof points !== 'number' || !timestamp) {
            return res.status(400).send('Invalid input.');
        }

        try {
            const newReward = this.rewardService.addReward(payer, points, new Date(timestamp));
            return res.status(200).send('Points added successfully.');
        } catch (error) {
            return res.status(500).send('An error occurred while adding points.');
        }
    }
    /**
     * Spend points using FIFO.
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object.
     */
    spendPoints(req, res) {
        const { points } = req.body;

        // Check if points are provided and valid
        if (typeof points !== 'number' || points <= 0) {
            return res.status(400).send('Invalid points value.');
        }

        try {
            // Check if user has enough points to spend
            const totalPoints = this.rewardService.getTotalPoints();
            if (totalPoints < points) {
                return res.status(400).send('User does not have enough points.');
            }
            console.log("in RewardController.spendPoints()");
            // Spend the points based on FIFO logic
            const spentPoints = this.rewardService.spendPoints(points);
            const spentPointsObject = Object.fromEntries(spentPoints);
            // Return a 200 response with the list of spent points
            return res.status(200).json(spentPointsObject);
        } catch (error) {
            return res.status(500).send('An error occurred while spending points.');
        }
    }
     /**
     * Get the current points balance for all payers.
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object.
     */
     getPointsBalance(req, res){
        try {
            console.log("rewardController.getPointsBalnace()");
            const balanceMap = this.rewardService.getPointsBalance();
            // console.log(balanceMap);
            const balanceObject = Object.fromEntries(balanceMap);
            return res.status(200).json(balanceObject);
        } catch (error) {
            return res.status(500).end();
        }
    }

} 

module.exports = RewardController;
     