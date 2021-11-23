//  Инициализация обработчика .env файла, содержащего настройки
require('dotenv').config()

//  Инициализация модулей Node
const TelegramBot = require('node-telegram-bot-api');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//  Инициализация пользовательских моделей

const MessageHandler = require('./models/MessageHandler')

//  Инициализация объекта бота
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

//  Инициализация объекта XMLHttpRequest
const xhr = new XMLHttpRequest();

//  Инициализация объекта обработчика сообщений
const mh = new MessageHandler();

bot.on("message", (msg) => {
    mh.handleMessage(msg, function(data){
        if("response" in data){
            const telegramId = msg.chat.id
            const options = ("options" in data.response)? data.response.options : {};
            switch(data.response.type){
                case "text":
                    bot.sendMessage(telegramId, data.response.text, options);
                    break;
                case "picture":
                    bot.sendPhoto(telegramId, data.response.picture.src, options);
                    break;
            }
        }
    });
});


/*
//  Начало общения с ботом
bot.onText(/\/start/, (msg) => {
    //  Получаем id чата
    const chatId = msg.chat.id;

    //  Получаем данные пользователя из бд, если они есть,
    //  либо создаем новый документ со значениями по умолчанию
    let user = new User(chatId);

    //  Ответное сообщение
    const resp = `Привет, это тестовая модель бота. Отправь /help, чтобы узнать, что он может.`;

    //  Отправляем ответное сообщение
    bot.sendMessage(chatId, resp);
});

//  Команда /help
bot.onText(/\/help/, (msg) => {
    //  Получаем id чата
    const chatId = msg.chat.id;

    //  Получаем данные пользователя из бд, если они есть,
    //  либо создаем новый документ со значениями по умолчанию
    let user = new User(chatId);

    //  Ответное сообщение
    const resp = `
На данный момент функционал бота работает не до конца.

Список доступных команд:

/ping - проверка работоспособности бота.

/cat - присылает случайную картинку котика.

/dog - присылает случайную картинку пёсика.
    `;

    //  Отправляем ответное сообщение
    bot.sendMessage(chatId, resp);
});


//  Проверка работоспособности бота
bot.onText(/\/ping/, (msg) => {
    //  Получаем id чата
    const chatId = msg.chat.id;

    //  Получаем данные пользователя из бд, если они есть,
    //  либо создаем новый документ со значениями по умолчанию
    let user = new User(chatId);

    //  Ответное сообщение
    const resp = 'pong';

    //  Отправляем ответное сообщение
    bot.sendMessage(chatId, resp);
});

//  Отправка случайной картинки котика
bot.onText(/\/cat/, (msg) => {
    //  Получаем id чата
    const chatId = msg.chat.id;

    //  Получаем данные пользователя из бд, если они есть,
    //  либо создаем новый документ со значениями по умолчанию
    let user = new User(chatId);

    // Обработчик изменения состояния готовности
    xhr.onreadystatechange = function () {
        //  Если получен ответ
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Извлекаем из JSON ответа ссылку на картинку с котиком
            let src = JSON.parse(xhr.responseText).file;

            //  Отправляем картинку в ответ
            bot.sendPhoto(chatId, src, { caption: "Держи картинку котика :3" });
        }
    }

    //  Инициализация нового XHR-запроса
    xhr.open("GET", "https://aws.random.cat/meow");

    //  Отправка XHR-запроса
    xhr.send();
});

//  Отправка случайной картинки котика
bot.onText(/\/dog/, (msg) => {
    //  Получаем id чата
    const chatId = msg.chat.id;

    //  Получаем данные пользователя из бд, если они есть,
    //  либо создаем новый документ со значениями по умолчанию
    let user = new User(chatId);

    // Обработчик изменения состояния готовности
    xhr.onreadystatechange = function () {
        //  Если получен ответ
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Извлекаем из JSON ответа ссылку на картинку с пёсиком
            let src = JSON.parse(xhr.responseText).message;

            //  Отправляем картинку в ответ
            bot.sendPhoto(chatId, src, { caption: "Держи картинку пёсика :3" });
        }
    }

    //  Инициализация нового XHR-запроса
    xhr.open("GET", "https://dog.ceo/api/breeds/image/random");

    //  Отправка XHR-запроса
    xhr.send();
});

bot.onText(/\/myid/, (msg) => {
    //  Получаем id чата
    const chatId = msg.chat.id;

    //  Получаем данные пользователя из бд, если они есть,
    //  либо создаем новый документ со значениями по умолчанию
    let user = new User(chatId);
    user.init(function(){
        //  Ответное сообщение
        const resp = `Твой chat id: ${user.telegramId}`;

        //  Отправляем ответное сообщение
        bot.sendMessage(chatId, resp);
    });
});
*/
