const express = require("express");
const Router = express.Router();

Router.use("/slashCommands", require("./slashCommands/slashCommands"));
Router.use(
  "/interactiveElements",
  require("./interactiveElements/interactiveElements")
);

Router.get("/", (req, res) => {
  res.send("Listening from Slack");
});

module.exports = Router;
