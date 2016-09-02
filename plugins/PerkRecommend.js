const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../plugins_assets/PerkRecommendPlugin.txt');

fs.closeSync(fs.openSync(filePath, 'w'));

module.exports = {
  eventTrigger: 'message',
  main(msg) {
    if (msg.initial.out && msg.text === '!ярекомендую' && msg.initial.reply_id) {
      fs.writeFileSync(filePath, msg.initial.reply_id);
    } else if (msg.text === '!перкрекомендует') {
      this.forward(fs.readFileSync(filePath, 'UTF-8'));
    }
  }
};