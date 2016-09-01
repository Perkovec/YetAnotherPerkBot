const about = 
(`YetAnotherPerkBot v0.2

Ссылка на исходники бота (там же и инструкция по созданию плагинов):
<a href=\\"https://github.com/Perkovec/YetAnotherPerkBot\\">GitHub</a>

По всем вопросам к \\"👨Перк\\" или @Perkovec`).replace(/\n/g, '\\n');

module.exports = {
  eventTrigger: 'message',
  main(msg) {
    if (msg.text === "!about") {
      this.send(about);
    }
  }
};