const router = require('express').Router();
const { Pose } = require('../../models');
const withAuth = require('../../utils/auth');

// Route for creating a new pose
router.post('/', withAuth, async (req, res) => {
    try {
        const newPose = await Pose.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPose);
    } catch (err) {
        res.status(400).json(err);
    }
});



module.exports = router;
