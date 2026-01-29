const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Book = require("./Book")(sequelize, Sequelize.DataTypes);
const BorrowLog = require("./BorrowLog")(sequelize, Sequelize.DataTypes);

Book.hasMany(BorrowLog, { foreignKey: "bookId" });
BorrowLog.belongsTo(Book, { foreignKey: "bookId" });

module.exports = { sequelize, Book, BorrowLog };
