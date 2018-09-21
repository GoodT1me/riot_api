export default (sequelize, DataTypes) => {
  const Summoner = sequelize.define('Summoner', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    summonerId: DataTypes.INTEGER,
    profileIconId: DataTypes.INTEGER,
    summoner_name: DataTypes.STRING(30),
    summonerLevel: DataTypes.INTEGER,
    accountId: DataTypes.INTEGER,
    region: DataTypes.STRING(4),
    revisionDate: DataTypes.STRING(15)
  });

  Summoner.tableName='summoners'

  return Summoner;
};