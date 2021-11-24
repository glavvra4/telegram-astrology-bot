// Объявление класса пользователя
const User = require('./User');

// Объявление классов обработчиков команд
const CommandHandler = require('./CommandHandler');
const TextCommandHandler = require('./TextCommandHandler');

/**
 * Класс обработчика сообщений
 */
module.exports = class MessageHandler {

    constructor(){}

    /**
     * Данный метод обрабатывает сообщение и вызывает колбэк, отправляя параметром объект
     * ответного сообщения 
     * @param {Object} message Объект Telegram-сообщения
     * @param {Function} callback Функция, вызываемая по завершении выполнения метода
     */
    handleMessage(message, callback){

        //  Извлечение id чата из объекта сообщения
        let telegramId = message.chat.id;

        //  Создание объекта пользователя
        let user = new User(telegramId);
        
        //  Инициализация пользователя
        user.init(async ()=>{

            //  Создание объектов обработчиков команд
            let ch = new CommandHandler(user);
            let tch = new TextCommandHandler(user, message.text);

            //  Объявляем объект ответного сообщения
            let data;

            if("text" in message){  //  Если сообщение содержит текст
                
                if(ch.isCommandExist(message.text)){    //  Если команда бота существует

                    //  Удаление символа "/"
                    let command = message.text.slice(1);

                    //  Вызов соответствующего метода обработчика команд
                    data = await ch[command]();
                
                }else{                                  //  Если команда бота не существует

                    //  Получение активной команды из БД
                    let command = user.command.name;
                    
                    if(command != 'none'){  //  Если есть активная команда

                        //  Удаление символа "/"
                        command = command.slice(1);

                        //  Вызов соответствующего метода обработчика текста
                        data = await tch[command]();
                    
                    }else{                  //  Если нет активной команды

                        //  Присвоение данных объекту ответного сообщения
                        data = {
                            response:{
                                type: "text",
                                text: "Неизвестная команда. Отправь боту /help, чтобы узнать список доступных функций."
                            }
                        }

                    }
                    
                }
            
            }else{  //  Если сообщение не содержит текста

                //  Присвоение данных объекту ответного сообщения
                data = {
                    response: {
                        type: "text",
                        text: "Ошибка: сообщение не содержит текста"
                    }
                }

            }
            callback(data);
        });

    }

}