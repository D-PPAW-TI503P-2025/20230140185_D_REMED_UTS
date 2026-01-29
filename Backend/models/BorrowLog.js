module.exports = (sequelize, DataTypes) => {
  return sequelize.define("BorrowLog", {
    userId: DataTypes.INTEGER,
    borrowDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
  });
};
