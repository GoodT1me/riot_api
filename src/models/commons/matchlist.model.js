export default (sequelize, DataTypes) => {
  const Matchlist = sequelize.define('Matchlist', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    accountId: DataTypes.STRING(14),
    matchlist_body: DataTypes.JSON
  });

  Matchlist.tableName='matchlists'

  return Matchlist;
};
