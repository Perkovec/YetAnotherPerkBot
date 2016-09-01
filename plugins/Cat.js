module.exports = {
  eventTrigger: 'message',
  main(msg) {
    if (msg.text === 'ping') {
      this.send('pong')
    }
  }
};