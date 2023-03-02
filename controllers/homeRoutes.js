const router = require('express').Router();
const { Pose, User } = require('../models');
const withAuth = require('../utils/auth');

// Get route for individual pose WITH auth
// router.get('/:id', withAuth, async (req, res) => {
//     try {
//         const poseData = await Pose.findByPk(req.params.id, {
//             include: [
//                 {
//                     model: Pose,
//                     attributes: ['name', 'description'], // attributes is referencing the column name ** THIS IS WHERE IMAGES CAN BE ADDED
//                 },
//             ],
//         });

//         const pose = poseData.get({ plain: true });

//         res.render('pose', {
//             ...pose,
//             logged_in: req.session.logged_in
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });


// Get route for all poses with auth

router.get('/gallery',withAuth, async (req, res) => {
    try {
        const poseData = await Pose.findAll({
                
                    attributes: ['name', 'description', 'image'], // attributes is referencing the column name ** THIS IS WHERE IMAGES CAN BE ADDED
        });

        const poses = poseData.map((pose) => pose.get({ plain: true }));

        res.render('gallery', {
            poses,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
);


// // GET Homepage
router.get('/', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('homepage');
});

// Get dashboard with auth
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {


            attributes: { exclude: ['password'] },
            include: [{ model: Pose }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;