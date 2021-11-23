//  Инициализация обработчика .env файла, содержащего настройки
require('dotenv').config()

//  Инициализация модулей Node
const mongoose = require("mongoose");

//  Инициализация схемы Mongoose
const Schema = mongoose.Schema;

//  Импорт url для подключения к MongoDB из .env файла
const url = process.env.MONGODB_CONNECTION_URL

//  Схема пользователя
const userEntityScheme = new Schema(
    {
        telegramId: Number,             //  Идентификатор Telegram
        role: String,                   //  Роль
        command:                        //  Текущая команда
        {                               //  { 
            name: String,               //      Имя текущей команды
            data: {}                    //      Данные текущей команды
        },                              //  }
        zodiacSign: String              //  Знак зодиака

    }, 
    {
        versionKey: false
    }
);

//Схема астрологического прогноза
const forecastEntityScheme = new Schema(
    {
        date: Date,                     //  Дата
        zodiacSignsPrediction:          //  Предсказание для каждого знака
        {                               //  {
            aries: String,              //      Овен
            taurus: String,             //      Телец
            gemini: String,             //      Близнецы
            cancer: String,             //      Рак
            leo: String,                //      Лев
            virgo: String,              //      Дева
            libra: String,              //      Весы
            scorpio: String,            //      Скорпион
            sagittarius: String,        //      Стрелец
            capricorn: String,          //      Козерог      
            aquarius: String,           //      Водолей
            pisces: String              //      Рыбы
        }                               //  }
    }, 
    {
        versionKey: false
    }
);

//Экспорт моделей базы данных
module.exports.User = mongoose.model("User", userEntityScheme);
module.exports.Forecast = mongoose.model("Forecast", forecastEntityScheme);

//  Подключение к MongoDB
mongoose.connect(
    url, 
    {
        useUnifiedTopology: true, 
        useNewUrlParser: true
    }
).then(
    () => { console.log("Подключение к MongoDB прошло успешно") },
    err => { console.error("Ошибка подключения: " + err) }
);
