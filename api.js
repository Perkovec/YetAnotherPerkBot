'use strict';

class API {
  constructor(connection) {
    this.connection = connection;
  }
  
  reply(reply_msg, msg) {
    this.connection.reply(reply_msg.initial.id, `<b>«bot»</b>\\n${msg}`);
  }
  
  send(msg) {
    this.connection.send('Анонимный_чат', `<b>«bot»</b>\\n${msg}`);
  }
  
  forward(msg_id) {
    this.connection.forward('Анонимный_чат', msg_id);
  }
  
  sendImage(path) {
    this.connection.sendImage('Анонимный_чат', path);
  }
  
  sendDocument(path) {
    this.connection.sendDocument('Анонимный_чат', path);
  }
}

module.exports = API;