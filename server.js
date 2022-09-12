const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./models");
const routes = require("./routes/tutorial.routes");

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Drop and re-synced db");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 4000;

app.use(routes);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
