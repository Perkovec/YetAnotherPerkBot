'use strict';

class API {
  constructor(connection) {
    this.connection = connection;
  }
  
  reply(reply_msg, msg) {
    this.connection.reply(reply_msg.initial.id, msg);
  }
  
  send(msg) {
    this.connection.send('Анонимный_чат', msg);
  }
  
  sendImage(path) {
    this.connection.sendImage('Анонимный_чат', path);
  }
  
  sendDocument(path) {
    this.connection.sendDocument('Анонимный_чат', path);
  }
}

module.exports = API;