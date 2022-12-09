module.exports = (sequelize, DataType) => {
  const Transaction = sequelize.define('Transaction', {
      price: DataType.INTEGER,
      status: DataType.INTEGER
  })
  return Transaction
}
