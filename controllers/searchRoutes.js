const router = require('express').Router();
const { Pose } = require('../models');
const withAuth = require('../utils/auth');

// Get route for user's search results
router.get('/poses', withAuth, async (req, res) => {
    const level = req.query.level;
    const area = req.query.area;
    const type = req.query.type;
    try {
        const poseData = await Pose.findAll({
            where: {
                level: level,
                area: area,
                type: type
            },
                    attributes: ['name', 'description', 'image'], // attributes is referencing the column name ** THIS IS WHERE IMAGES CAN BE ADDED

        });

        const poses = poseData.map((pose) => pose.get({ plain: true }));

        res.render('poses', {
            poses,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
