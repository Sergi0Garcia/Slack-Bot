const express = require("express");
const bodyParser = require("body-parser");
const { web } = require("../../../services/slack/configs");
const Router = express.Router();

Router.use(bodyParser.urlencoded({ extended: true }));

Router.post("/test", async (req, res) => {
  try {
    const id_sending = req.body.user_id;
    const triggerId = req.body.trigger_id;
    await web.views.open({
      trigger_id: triggerId,
      view: {
        type: "modal",
        callback_id: "modal-identifier",
        title: {
          type: "plain_text",
          text: "Send One liner"
        },
        submit: {
          type: "plain_text",
          text: "Submit"
        },
        close: {
          type: "plain_text",
          text: "Cancel"
        },
        blocks: [
          {
            type: "input",
            block_id: "inputblock",
            element: {
              type: "plain_text_input",
              action_id: "inputIdentifier",
              placeholder: {
                type: "plain_text",
                text: "What have you done today?"
              }
            },
            label: {
              type: "plain_text",
              text: "Please enter your One liner"
            }
          },
          {
            type: "input",
            block_id: "userblock",
            element: {
              type: "users_select",
              action_id: "userIdentifier",
              placeholder: {
                type: "plain_text",
                text: "User?"
              }
            },
            label: {
              type: "plain_text",
              text: "Please select user"
            }
          }
        ]
      }
    });
    res.send();
  } catch (err) {
    console.log(err);
  }
});

module.exports = Router;
