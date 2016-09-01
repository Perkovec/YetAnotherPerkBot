const TelegramAPI = require('tg-cli-node');
const BotAPI = require('./api');
const config = require('./config');
const plugins = require('./plugins');

const chat_id = 94435633;

const Plugins = new plugins();

const Client = new TelegramAPI(config);
 
Client.connect(connection => {
  const API = new BotAPI(connection);
  connection.on('message', msg => {
    if (msg.out && msg.to.peer_id === chat_id) {
      try {
        Plugins.processSelf(API, msg);
      } catch(e) {
        console.log(msg.text)
      }
    }
    
    if (msg.from && msg.from.peer_id === chat_id) {
      try {
        Plugins.process(API, msg);
      } catch(e) {
        console.log(msg.text)
      }
    }
  });
 
  connection.on('error', e => {
    console.log('Error from Telegram API:', e);
  });
 
  connection.on('disconnect', () => {
    console.log('Disconnected from Telegram API');
  });
});