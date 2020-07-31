const TelegramBoot = require('node-telegram-bot-api');

const token = '1322731419:AAEKMIGUiITurPG7wm5qrXS5HdFAxA6XLBo';

const boot = new TelegramBoot(token, {
  polling: true,
});

boot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log(msg.text);

  boot.sendMessage(chatId, 'Obrigado por sua mensagem');
});