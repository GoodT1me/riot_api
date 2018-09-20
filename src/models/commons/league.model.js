export default (sequelize, DataTypes) => {
  const League = sequelize.define('League', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    leagueId: DataTypes.STRING(100),
    leagues_body: DataTypes.JSON
  });

  League.tableName='leagues'

  return League;
};
