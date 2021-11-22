# Астрологический Telegram-бот

Этот репозиторий можно использовать для создания своего собственного бота, умеющего делать астрологические прогнозы. Кроме того, в нем есть множество других интересных функций.

## Предварительные требования

- Docker с установленным docker-compose
- Node JS версии 16.13.0 и выше
- npm версии 8.1.4 и выше

## Установка

- Вводим в командной строке следующие команды:

```bash
    git clone https://github.com/glavvra4/telegram-astrology-bot
    cd ./telegram-astrology-bot
    npm install
    mkdir -pv mongodb/database
```

- Открываете файл `.env-example` и изменяете значение `TELEGRAM_BOT_TOKEN` на токен, полученный у BotFather
- Переименовываете файл `.env-example` в `.env`
- Запускаем бота через командную строку:

```bash
    docker-compose up -d
    npm start
```

- Готово, бот работает! 😎
