const AbstractCommandHandler = require("./AbstractCommandHandler");

/**
 * Объект обработчика команд без знака /, методы данного объекта 
 * активируются в MessageHandler только в том случае, когда в
 * документе пользователя в бд в command.name есть какая-либо команда 
 */
module.exports = class TextCommandHandler extends AbstractCommandHandler{

    /**
     * Конструктор объекта
     * @param {Object} user Объект пользователя  User
     * @param {String} message Текст сообщения Telegram
     */
    constructor(user, message){

        super(user);
        this.message = message

    }

    /**
     * Смена знака зодиака
     * @returns {Object} Объект ответного сообщения
     */
    async setmyzodiacsign(){

        //  Объявляем объект ответного сообщения
        let data;

        if(this.isZodiacSign(this.message)){    //  Если текст сообщения является знаком зодиака

            //  Выбираем значение знака зодиака для хранения в бд
            let sign;
            switch(this.message.toLowerCase()){
                case "овен": sign = "aries"; break;             case "телец": sign = "taurus"; break; 
                case "близнецы": sign = "gemini"; break;        case "рак": sign = "cancer"; break;
                case "лев": sign = "leo"; break;                case "дева": sign = "virgo"; break;
                case "весы": sign = "libra"; break;             case "скорпион": sign = "scorpio"; break;
                case "стрелец": sign = "sagittarius"; break;    case "козерог": sign = "capricorn"; break;
                case "водолей": sign = "aquarius"; break;       case "рыбы": sign = "pisces"; break;
            }

            //  Устанавливаем и сохраняем в бд знак зодиака для пользователя
            this.user.zodiacSign = sign;

            //  Обнуляем текущую команду
            this.user.command = {
                name: "none",
                data: {}
            }

            //  Формируем объект для ответного сообщения
            data = {
                response:{
                    type: "text",
                    text: `Вы выбрали знак зодиака "${this.message.toLowerCase()}". Вы можете сменить его в любой момент, снова написав боту команду /setmyzodiacsign`,
                    options:{
                        reply_markup:{
                            remove_keyboard:true
                        }
                    }
                }
            }

        }else{                                  //  Если текст сообщения не является знаком зодиака

            //  Формируем объект для ответного сообщения
            data = {
                response:{
                    type: "text",
                    text: "Ошибка: такого знака не существует"
                } 
            } 

        }
        
        //  Возвращаем объект сообщения 
        return data;

    }
    
}