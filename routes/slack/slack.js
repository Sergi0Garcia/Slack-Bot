const express = require('express');

const Router = express.Router();

/**
 * Routes to connect acsess point from slack slash command
 * @Route Requirement routes
 * @access Private
 */

Router.use('/slashCommands', require('./slashCommands/slashCommands'));
Router.use(
  '/interactiveElements',
  require('./interactiveElements/interactiveElements')
);

Router.get('/', (req, res) => {
  res.send('Listening from Slack');
});

module.exports = Router;
