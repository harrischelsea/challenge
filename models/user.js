module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        username: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        ime: { type: DataTypes.STRING, allowNull: false },
        prezime: { type: DataTypes.STRING, allowNull: false },
    });

    User.associate = function(models) {
        models.User.belongsToMany(models.Link, {through: 'UserLink'});
    };

    return User;
};