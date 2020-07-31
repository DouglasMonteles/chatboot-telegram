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

  console.log(JSON.stringify(result, null, 2))
}

sendMessage('1322731419', 'oi');