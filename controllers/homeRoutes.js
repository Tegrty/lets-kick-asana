const router = require('express').Router();
const { Pose } = require('../models');
const withAuth = require('../utils/auth');

// Get route for individual pose WITH auth
router.get('/:id', withAuth, async (req, res) => {
    try {
        const poseData = await Pose.findByPk(req.params.id, {
            include: [
                {
                    model: Pose,
                    attributes: ['name', 'description'], // attributes is referencing the column name ** THIS IS WHERE IMAGES CAN BE ADDED
                },
            ],
        });

        const pose = poseData.get({ plain: true });

        res.render('pose', {
            ...pose,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// Get route for all poses with auth

router.get('/', withAuth, async (req, res) => {
    try {
        const poseData = await Pose.findAll({
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
}
);

module.exports = router;
