//  Инициализация обработчика .env файла, содержащего настройки
require('dotenv').config()

//  Инициализация модулей Node
const mongoose = require("mongoose");

//  Инициализация схемы Mongoose
const Schema = mongoose.Schema;

//  Импорт url для подключения к MongoDB из .env файла
const url = process.env.MONGODB_CONNECTION_URL

//  Подключение к MongoDB
mongoose.connect(
    url, 
    {
        useUnifiedTopology: true, 
        useNewUrlParser: true
    }, 
    function(err){
        if(err) return console.log(err);
    }
);