const router = require('express').Router();
const { Pose } = require('../../models');
const withAuth = require('../../utils/auth');

// Get route for user's search results
router.get('/', withAuth, async (req, res) => {
    const level = req.query.level;
    const area = req.query.area;
    try {
        const poseData = await Pose.findAll({
            where: {
                level: level,
                area: area
            },
            include: [
                {
                    model: Pose,
                    attributes: ['name', 'description'], // attributes is referencing the column name ** THIS IS WHERE IMAGES CAN BE ADDED
                },
            ],
        });

        const poses = poseData.map((pose) => pose.get({ plain: true }));

        res.render('pose', {
            poses,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});