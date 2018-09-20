export default (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    server_name: DataTypes.STRING(50),
    region_tag: DataTypes.STRING(6),
    hostname: DataTypes.STRING(30),
    status_body: DataTypes.JSON
  });

  Status.tableName='statuses'

  return Status;
};
