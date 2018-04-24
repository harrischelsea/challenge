module.exports = (sequelize, DataTypes) => {
    let Link = sequelize.define('Link', {
        name: { type: DataTypes.STRING, allowNull: false },
    });

    Link.associate = function(models) {
        models.Link.belongsToMany(models.User, {through: 'UserLink'});
    };

    return Link;
};