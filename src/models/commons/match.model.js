export default (sequelize, DataTypes) => {
  const Match = sequelize.define('Match', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    seasonId: DataTypes.INTEGER,
    queueId: DataTypes.INTEGER,
    gameId: DataTypes.STRING(20),
    match_body: DataTypes.JSON
  });

  Match.tableName='matches'

  return Match;
};
