const Dialogflow = require('dialogflow');
const configs = require('../chartboot-telegram-tinp-606f6bf2cac1.json');

const sessionClient = new Dialogflow.SessionsClient({
  projectId: configs.project_id,
  credentials: {
    private_key: configs.private_key,
    client_email: configs.client_email,
  },
});

async function sendMessage(chatId, msg) {
  const sessionPath = sessionClient.sessionPath(configs.project_id, chatId);
  
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: msg,
        languageCode: 'pt-BR',
      }
    }
  };

  const response = await sessionClient.detectIntent(request);

  const result = response[0].queryResult;

  const data = {
    text: result.fulfillmentText,
    intent: result.intent.displayName,
    fields: result.parameters.fields,
  };

  return data;
}

module.exports.sendMessage = sendMessage;