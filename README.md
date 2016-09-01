# YetAnotherPerkBot

Чат бот для чат бота @YetAnotherBot в Telegram.

## Установка
Клонируйте этот репозиторий:
```bash
git clone git@github.com:Perkovec/YetAnotherPerkBot.git
```

Переходим в папку с ботом:
```bash
cd YetAnotherPerkBot
```

Устанавливаем зависимости:
```bash
npm install
```

В него клонируем [tg-cli](https://github.com/vysheng/tg) и компилируем, следуя [инструкции](https://github.com/vysheng/tg#installation)

После того, как вы удачно скомпилировали [tg-cli](https://github.com/vysheng/tg), вы должны его запустить:
```bash
./tg/bin/telegram-cli -k ./tg/tg-server.pub
```
После запуска вам необходимо авторизироваться. Авторизировались? Можете останавливать (`Ctrl+C`)

А теперь запускаем бота:
```bash
node index
```

## Создание плагинов
Все плагины хранятся в папке `plugins`, на каждый плагин – отдельный файл.
Строение плагина:
```javascript
module.exports = {
  eventTrigger: 'message',
  main(msg) {
    console.log(msg.text);
  }
}
```

`eventTrigger` – событие, при котором будет вызываться плагин:
- `message` – обычное сообщение
- `leave` – кто-то вышел из чата
- `entry` – кто-то вошел в чат

`main` – функция, которая будет вызываться по событию `eventTrigger`. Обращение к API через контекст (`this`):
- `this.send( msg:string )` – отправка сообщения в чат
- `this.sendImage( path:string )` – отправка картинки в чат
- `this.sendDocument( path:string )` – отправка документа в чат

В функцию `main` одним и единственным аргументом передается объект с содержанием события:
- событие – `message`
  - `raw`:string – содержимое сообщения (вместе с ником)
  - `username`:string – ник отправителя сообщения
  - `text`:string – текст сообщения
- событие – `leave`
  - `raw`:string – содержимое сообщения
  - `user_id`:string – ID пользователя, который вышел
  - `username`:string - ник пользователя, который вышел
  - `isBan`:boolean - забанил ли пользователь бота
- событие – `entry`
  - `raw`:string – содержимое сообщения
  - `user_id`:string – ID пользователя, который вошел
  - `username`:string - ник пользователя, который вошел
  - `isNewbie`:boolean - новый ли пользователь

### Пример плагина
```javascript
module.exports = {
  eventTrigger: 'message',
  main(msg) {
    if (msg.text === 'ping') {
      this.send('pong');
    }
  }
}
```