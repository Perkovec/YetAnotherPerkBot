const fs = require('fs');

const leaveRegex = /^(\[bot\].*выходит из чата)/ig;
const leaveIDRegex = /#\w*/i;
const leaveNicknameRegex = /`.*`/i;

const entryRegex = /^(\[bot\].*входит в чат)/ig;
const entryIDRegex = /#\w*/i;
const entryNicknameRegex = /`.*`/i;

const messageRegex = /.*^[^:]*:/i;
const messageTextRegex = /:\s\s.*/i;
const messageUsernameRegex = /^[^:]*:/i;

class Plugins {
  constructor() {
    this.plugins = {
      message: [],
      leave: [],
      entry: []
    };
    this._registerPlugins();
  }
    
  _registerPlugins() {
    const fileList = fs.readdirSync('./plugins');
    for (let i = 0; i < fileList.length; ++i) {
      const plugin = require(`./plugins/${fileList[i]}`);
      if (plugin && plugin.eventTrigger) {
        this.plugins[plugin.eventTrigger].push(plugin);
      }
    }
  }
  
  processSelf(api, msg) {
    if (msg && msg.text) {
      for (let i = 0; i < this.plugins.message.length; ++i) {
        this.plugins.message[i].main.call(api, {
          raw: `👨Перк:  ${msg.text}`,
          username: '👨Перк',
          text: msg.text
        });
      }
    }
  }
  
  process(api, msg) {
    const emit = (plugins, msg) => {
      for (let i = 0; i < plugins.length; ++i) {
        plugins[i].main.call(api, msg);
      }
    }
    
    if (msg && msg.text) {
      if (leaveRegex.test(msg.text)) {
        emit(this.plugins.leave, {
          raw: msg.text,
          user_id: msg.text.match(leaveIDRegex)[0].slice(1),
          username: msg.text.match(leaveNicknameRegex)[0].slice(1, -1),
          isBan: (msg.text.indexOf('Этот негодяй забанил бота') > -1)
        });
      } else if (entryRegex.test(msg.text)) {
        emit(this.plugins.entry, {
          raw: msg.text,
          user_id: msg.text.match(entryIDRegex)[0].slice(1),
          username: msg.text.match(entryNicknameRegex)[0].slice(1, -1),
          isNewbie: (msg.text.indexOf('Он новенький') > -1)
        });
      } else if (messageRegex.test(msg.text)) {
        emit(this.plugins.message, {
          raw: msg.text,
          username: msg.text.match(messageUsernameRegex)[0].slice(0, -1),
          text: msg.text.match(messageTextRegex)[0].slice(3)
        });
      }
    }
  }
}

module.exports = Plugins;