const fs = require('fs');
const path = require('path');
const request = require('request');

function download(uri, filename){
  return new Promise((resolve, reject) => {
    request.head(uri, function(err, res, body){
      console.log('content-type:', res.headers['content-type']);
      console.log('content-length:', res.headers['content-length']);

      request(uri).pipe(fs.createWriteStream(filename)).on('close', resolve);
    });
  });
};

module.exports = {
  eventTrigger: 'message',
  main(msg) {
    if (msg.text === '!cat') {
      const picName = 'cat' + new Date().getTime() + '.jpeg';
      const pathToPic = path.join(__dirname, '../plugins_assets', picName);
      download('http://thecatapi.com/api/images/get?format=src&type=jpg', pathToPic)
        .then(() => {
          this.sendImage(pathToPic);
          setTimeout(() => {
            fs.unlink(pathToPic);
          }, 1000);
        });
    }
  }
};