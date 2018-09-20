export default (sequelize, DataTypes) => {
  const Position = sequelize.define('Position', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    queueType: DataTypes.STRING(40),
    hotStreak: DataTypes.BOOLEAN,
    wins: DataTypes.INTEGER,
    veteran: DataTypes.BOOLEAN,
    losses: DataTypes.INTEGER,
    playerOrTeamId: DataTypes.STRING(10),
    leagueName: DataTypes.STRING(100),
    playerOrTeamName: DataTypes.STRING(30),
    inactive: DataTypes.BOOLEAN,
    flex_rank: DataTypes.STRING(4),
    freshBlood: DataTypes.BOOLEAN,
    leagueId: DataTypes.STRING(100),
    tier: DataTypes.STRING(20),
    leaguePoints: DataTypes.INTEGER
  });

  Position.tableName='positions'

  return Position;
};