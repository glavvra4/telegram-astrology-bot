//  Инициализация обработчика .env файла, содержащего настройки
require('dotenv').config()

//  Инициализация модулей node
const TelegramBot = require('node-telegram-bot-api');

//  Инициализация объектов
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

//  Начало общения с ботом
bot.onText(/\/start/, (msg) => {
    //  Получаем id чата
    const chatId = msg.chat.id;

    //  Ответное сообщение
    const resp = `Привет, это тестовая модель бота. Отправь /help, чтобы узнать, что он может.`;

    //  Отправляем ответное сообщение
    bot.sendMessage(chatId, resp);
});

//  Команда /help
bot.onText(/\/help/, (msg) => {
    //  Получаем id чата
    const chatId = msg.chat.id;

    //  Ответное сообщение
    const resp = `
На данный момент функционал бота работает не до конца.

Список доступных команд:

/ping - проверка работоспособности бота.
    `;

    //  Отправляем ответное сообщение
    bot.sendMessage(chatId, resp);
});


//  Проверка работоспособности бота
bot.onText(/\/ping/, (msg) => {
    //  Получаем id чата
    const chatId = msg.chat.id;

    //  Ответное сообщение
    const resp = 'pong';

    //  Отправляем ответное сообщение
    bot.sendMessage(chatId, resp);
});
