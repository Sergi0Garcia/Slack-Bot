const express = require("express");
const { web, slackInteractions } = require("../../../services/slack/configs");
const Router = express.Router();
//const bodyParser = require("body-parser");
//Router.use(bodyParser.urlencoded({ extended: true }));

Router.use(slackInteractions.requestListener());

slackInteractions.action(
  { actionId: "received_button" },
  async (payload, respond) => {
    const user_id = payload.actions[0].value;
    const ts = payload.actions[0].action_ts;
    const message_ts = payload.message.ts;
    console.log(payload.channel.id);
    await web.chat.postMessage({
      channel: user_id,
      as_user: true,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `One liner received`
          }
        }
      ]
    });
    //await respond({ text: "Thanks" });
    await web.chat.update({
      as_user: true,
      channel: payload.channel.id,
      ts: message_ts,
      text: "Thanks",
      blocks: []
    });
  }
);

slackInteractions.viewSubmission(
  { callbackId: "modal-identifier" },
  async (payload, response) => {
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
          type: "section",
          text: {
            type: "mrkdwn",
            text: `From @${user_sending}: ${oneLiner}`
          }
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Received"
              },
              action_id: "received_button",
              value: id_sending
            }
          ]
        }
      ]
    });
  }
);

module.exports = Router;
