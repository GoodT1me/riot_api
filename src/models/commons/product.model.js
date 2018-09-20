export default (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pr_name: DataTypes.STRING(50),
    pr_description: DataTypes.STRING(200),
    quantity: DataTypes.INTEGER,
    code: DataTypes.STRING(8),
    // changedBy: DataTypes.INTEGER,
    // changedOn: DataTypes.DATE
  });

  Product.tableName='products'

  return Product;
};
