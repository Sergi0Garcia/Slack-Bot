const express = require('express');
const { web, slackInteractions } = require('../../../services/slack/configs');

const Router = express.Router();
// const bodyParser = require("body-parser");
// Router.use(bodyParser.urlencoded({ extended: true }));

Router.use(slackInteractions.requestListener());

/**
 * Action response after trigger
 * @params actionId
 * Function that once button pushed sends to user message
 */

slackInteractions.action({ actionId: 'received_button' }, async payload => {
  const user_id = payload.actions[0].value;
  const message_ts = payload.message.ts;
  await web.chat.postMessage({
    channel: user_id,
    as_user: true,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `One liner received`
        }
      }
    ]
  });

  /**
   * Use RESPOND parameter in async declaration
   * await respond({ text: "Thanks" });
   * Function that clears button and displays just a text
   */

  await web.chat.update({
    as_user: true,
    channel: payload.channel.id,
    ts: message_ts,
    text: 'Thanks',
    blocks: []
  });
});

/**
 * Actions after opening the slack Modal
 * @params callbackId
 * Function that sends message and button to the desired user with payload message
 */

slackInteractions.viewSubmission(
  { callbackId: 'modal-identifier' },
  async payload => {
    const userID =
      payload.view.state.values.userblock.userIdentifier.selected_user;
    const oneLiner = payload.view.state.values.inputblock.inputIdentifier.value;
    const id_sending = payload.user.id;
    const user_sending = payload.user.name;
    await web.chat.postMessage({
      channel: userID,
      as_user: true,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `From @${user_sending}: ${oneLiner}`
          }
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'Received'
              },
              action_id: 'received_button',
              value: id_sending
            }
          ]
        }
      ]
    });
  }
);

module.exports = Router;
