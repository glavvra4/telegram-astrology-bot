const API = require('./API');
const AbstractCommandHandler = require("./AbstractCommandHandler");

/**
 * Класс обработчика команд
 */
module.exports = class CommandHandler extends AbstractCommandHandler{

    /**
     * Конструктор объекта
     * @param {Object} user Объект пользователя  User
     */
    constructor(user){

        super(user);

    }

    /**
     * Сообщение, отправляемое при начале общения с ботом
     * @returns {Object} Возвращает объект данных для отправки сообщения
     */
    async start(){
        
        //  Формируем объект для ответного сообщения
        let data = {
            response:{
                type: "text",
                text: "Привет, это тестовая модель бота. Отправь /help, чтобы узнать, что он может"
            }
        }

        //  Возвращаем объект
        return data;

    }
    
    /**
     * Проверка работоспособности бота
     * @returns {Object} Возвращает объект данных для отправки сообщения
     */
    async ping(){

        //  Формируем объект для ответного сообщения
        let data = {
            response:{
                type: "text",
                text: "pong"
            }
        }

        //  Возвращаем объект
        return data;

    }
    
    /**
     * Инициализация смены знака зодиака
     * @returns {Object} Возвращает объект данных для отправки сообщения
     */
    async setmyzodiacsign(){

        //  Изменяем активную команду
        this.user.command = { 
            name: "/setmyzodiacsign",
            data: {}
        }

        //  Формируем объект для ответного сообщения
        let data = {
            response: {
                type: "text",
                text: "Выбери свой знак зодиака:",
                options:{
                    reply_markup:{
                        keyboard: [
                            [ "Овен", "Телец" ],
                            [ "Близнецы", "Рак" ],
                            [ "Лев", "Дева" ],
                            [ "Весы", "Скорпион" ],
                            [ "Стрелец", "Козерог" ],
                            [ "Водолей", "Рыбы" ]
                        ]
                    }
                }  
            }
        }
        
        //Возвращаем объект
        return data;

    }

    /**
     * Отправка случайного изображения с котиком
     * @returns {Object} Возвращает объект данных для отправки сообщения
     */
    async cat(){

        //  Формируем объект для ответного сообщения, при этом ожидая получения ответа от метода API
        let data = {
            response:{
                type: "picture",
                src: await API.getRandomCatPicture(),
                options:{
                    caption: "Держи картинку котика :3"
                }
            }
        }

        //Возвращаем объект
        return data;

    }

    /**
     * Отправка случайного изображения с пёсиком
     * @returns {Object} Возвращает объект данных для отправки сообщения
     */
    async dog(){

        //  Формируем объект для ответного сообщения, при этом ожидая получения ответа от метода API
        let data = {
            response:{
                type: "picture",
                src: await API.getRandomDogPicture(),
                options:{
                    caption: "Держи картинку пёсика :3"
                }
            }
        }

        //  Возвращаем объект
        return data;
        
    }
}

