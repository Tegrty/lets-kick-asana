const User = require('./User');
const Pose = require('./Pose');

User.hasMany(Pose, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Pose.belongsTo(User, {
    foreignKey: 'user_id'
});


module.exports = { User, Pose };
