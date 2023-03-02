const sequelize = require('../config/connection');
const { User, Pose } = require('../models'); //imported Pose model but remove if we dont end up using it

const userData = require('./userData.json');
const poseData = require('./poseData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true});

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    const poses = await Pose.bulkCreate(poseData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
}



seedDatabase();
