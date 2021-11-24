
/**
 * Класс абстрактоного обработчика команд
 */
module.exports = class AbstractCommandHandler{
    
    /**
     * Конструктор класса
     * @param {Object} user Объект пользователя класса User
     */
    constructor(user){

        this.user = user;

    }

    /**
     * Если команда Telegram-бота (command) существует, возвращает true, иначе возвращает false
     * @param {string} text 
     * @returns {boolean}
     */
    isCommandExist(command){

        //  Проверяем, является ли строка командой, и если да, ищем ее в списке доступных команд
        if(this.isCommand(command)){
            
            //  Отрезаем символ "/"  
            command = command.slice(1);

            //  Ищем команду в объекте и возвращаем результат
            return (command in this)? true : false;

        }

    }
    
    /**
     * Если параметр text является командой Telegram-бота, возвращает true, иначе возвращает false
     * @param {string} text 
     * @returns {boolean}
     */
    isCommand(command){

        //  Проверяет, начинается ли сообщение с "/""
        return (command.startsWith("/")) ? true : false;

    }

    /**
     * Если параметр text является знаком зодиака, возвращает true, иначе возвращает false
     * @param {string} text 
     * @returns {boolean}
     */
    isZodiacSign(text){

        //  Ищем строку с названием знака в списке доступных, при этом переводя строку в нижний регистр 
        let zodiacSigns = ["овен", "телец", "близнецы", "рак", "лев", "дева", "весы", "скорпион", "стрелец", "козерог", "водолей", "рыбы"];
        return (zodiacSigns.indexOf(text.toLowerCase()) == -1) ? false : true;

    }
}