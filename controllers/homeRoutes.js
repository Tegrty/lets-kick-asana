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

router.get('/', async (req, res) => {
    try {
        const poseData = await Pose.findAll({
                
                    attributes: ['name', 'description', 'image'], // attributes is referencing the column name ** THIS IS WHERE IMAGES CAN BE ADDED
        });

        const poses = poseData.map((pose) => pose.get({ plain: true }));

        res.render('homepage', {
            poses,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
);



// get route to render homepage with no data
// router.get('/', async (req, res) => {
//     try {
//         res.render('homepage', {
//             logged_in: req.session.logged_in
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });


// // GET login
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});


module.exports = router;