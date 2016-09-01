const help = 
(`Доступные команды YetAnotherPerkBot:
!cat - присылает в чат фото котика
!about - информация о боте
!help - команды бота`).replace(/\n/g, '\\n');

module.exports = {
  eventTrigger: 'message',
  main(msg) {
    if (msg.text === '!help') {
      this.send(help);
    }
  }
};