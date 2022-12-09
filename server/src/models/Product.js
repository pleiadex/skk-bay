module.exports = (sequelize, DataType) => {
  const Product = sequelize.define('Product', {
      name: DataType.STRING,
      price: DataType.INTEGER,
      tradingplace: DataType.STRING,
      description: DataType.STRING,
      status: DataType.INTEGER,
      image1: DataType.STRING,
      image2: DataType.STRING,
      image3: DataType.STRING,
      image4: DataType.STRING
  })
  return Product
}
