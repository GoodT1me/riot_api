export default (sequelize, DataTypes) => {
  const ChampRotation = sequelize.define('ChampRotation', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    region_tag: DataTypes.STRING(6),
    champ_rotation_body: DataTypes.JSON
  });

  ChampRotation.tableName='champ_rotations'

  return ChampRotation;
};
