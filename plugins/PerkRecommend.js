'use strict';
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../plugins_assets/PerkRecommendPlugin.txt');

try {
  fs.accessSync(filePath, fs.F_OK);
} catch (e) {
  fs.closeSync(fs.openSync(filePath, 'w'));
}

let lastRecommend = new Date();

module.exports = {
  eventTrigger: 'message',
  main(msg) {
    if ((new Date() - lastRecommend) < 1000 * 15) return;
    
    if (msg.initial.out && msg.text === '!ярекомендую' && msg.initial.reply_id) {
      fs.writeFileSync(filePath, msg.initial.reply_id);
    } else if (msg.text === '!перкрекомендует') {
      this.forward(fs.readFileSync(filePath, 'UTF-8'));
      lastRecommend = new Date();
    }
  }
};