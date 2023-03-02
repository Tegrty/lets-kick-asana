const router = require('express').Router();
const userRoutes = require('./userRoutes');
const poseRoutes = require('./poseRoutes');

router.use('/users', userRoutes);
router.use('/poses', poseRoutes);

module.exports = router;