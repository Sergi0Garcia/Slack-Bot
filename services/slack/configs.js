const { WebClient } = require('@slack/web-api');
const { createMessageAdapter } = require('@slack/interactive-messages');

const token = 'xoxb-716891471686-931974819107-GnwwWAxVzVBRtUm29bhBVBi9';
const signingSecret = '553a3dc3624c73ccb54a5dc25616ef72';

const web = new WebClient(token);
const slackInteractions = createMessageAdapter(signingSecret);

module.exports = { web, slackInteractions };
