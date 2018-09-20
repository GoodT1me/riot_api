export default (sequelize, DataTypes) => {
  const Language = sequelize.define('Language', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    code: DataTypes.STRING(4),
    title: DataTypes.STRING(100),
    active: DataTypes.BOOLEAN,
    is_default: DataTypes.BOOLEAN,
    // changedBy: DataTypes.INTEGER,
    // changedOn: DataTypes.DATE
  });

  Language.tableName = 'languages'

  return Language;
};
