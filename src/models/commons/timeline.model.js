export default (sequelize, DataTypes) => {
  const Timeline = sequelize.define('Timeline', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    gameId: DataTypes.INTEGER,
    timeline_body: DataTypes.JSON
  });

  Timeline.tableName='timelines'

  return Timeline;
};
