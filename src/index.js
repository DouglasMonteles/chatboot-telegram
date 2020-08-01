const TelegramBoot = require('node-telegram-bot-api');

const dialogflow = require('./dialogflow');
const youtube = require('./youtube');

const token = '';

const boot = new TelegramBoot(token, {
  polling: true,
});

boot.on('message', async (msg) => {
  const chatId = msg.chat.id;
 
  const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text);

  let responseText = dfResponse.text;

  if (dfResponse.intent === 'treino específico') {
    responseText = youtube.searchVideoURL(responseText, dfResponse.fields.corpo.stringValue);
  }

  boot.sendMessage(chatId, responseText);
});