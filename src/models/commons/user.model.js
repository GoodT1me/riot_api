export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: DataTypes.STRING(255),
    lastName: DataTypes.STRING(255),
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    active: DataTypes.BOOLEAN,
    // changedBy: DataTypes.INTEGER,
    // changedOn: DataTypes.DATE
  });

  User.tableName = 'users'

  return User;
};
