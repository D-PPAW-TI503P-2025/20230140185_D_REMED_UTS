require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./models");

const PORT = process.env.APP_PORT || 3000;

sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database error:", err.message);
  });
