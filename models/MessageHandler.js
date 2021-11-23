const User = require('./User');
const API = require('./API');

module.exports = class MessageHandler {
    constructor(){}

    handleMessage(message, callback){
        let telegramId = message.chat.id;
        let user = new User(telegramId);
        user.init(async ()=>{
            let data;
            if("text" in message){
                if(this.isCommand(message.text)){
                    switch(message.text){
                        case "/start":
                            data = {
                                response:{
                                    type: "text",
                                    text: "Привет, это тестовая модель бота. Отправь /help, чтобы узнать, что он может."
                                }
                            }
                            break;
                        case "/setmyzodiacsign":
                            user.command = { 
                                name: "/setmyzodiacsign",
                                data: {}
                            }

                            data = {
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
                            break;
                        case "/ping":
                            data = {
                                response:{
                                    type: "text",
                                    text: "pong"
                                }
                            }
                            break;
                        case "/cat":
                            data = {
                                response:{
                                    type: "picture",
                                    src: await API.getRandomCatPicture(),
                                    options:{
                                        caption: "Держи картинку котика :3"
                                    }
                                }
                            }
                            break;
                        case "/dog":
                            data = {
                                response:{
                                    type: "picture",
                                    src: await API.getRandomDogPicture(),
                                    options:{
                                        caption: "Держи картинку пёсика :3"
                                    }
                                }
                            }
                            break;
                        default:
                            data = {
                                response:{
                                    type: "text",
                                    text: "Неизвестная команда. Отправь боту /help, чтобы узнать список доступных функций."
                                }
                            }
                    }

                }else{
                    let activeCommand = user.command;
                    switch(activeCommand.name){
                        case "/setmyzodiacsign":
                            if(this.isZodiacSign(message.text)){
                                let sign;
                                switch(message.text.toLowerCase()){
                                    case "овен": sign = "aries"; break; 
                                    case "телец": sign = "taurus"; break; 
                                    case "близнецы": sign = "gemini"; break;
                                    case "рак": sign = "cancer"; break;
                                    case "лев": sign = "leo"; break;
                                    case "дева": sign = "virgo"; break;
                                    case "весы": sign = "libra"; break;
                                    case "скорпион": sign = "scorpio"; break;
                                    case "стрелец": sign = "sagittarius"; break;
                                    case "козерог": sign = "capricorn"; break;
                                    case "водолей": sign = "aquarius"; break;
                                    case "рыбы": sign = "pisces"; break;
                                }
                                user.zodiacSign = sign;
                                user.command = {
                                    name: "none",
                                    data: {}
                                }
                                data = {
                                    response:{
                                        type: "text",
                                        text: `Вы выбрали знак зодиака "${message.text.toLowerCase()}". Вы можете сменить его в любой момент, снова написав боту команду /setmyzodiacsign`,
                                        options:{
                                            reply_markup:{
                                                remove_keyboard:true
                                            }
                                        }
                                    }
                                }
                            }else{
                                data = {
                                    response:{
                                        type: "text",
                                        text: "Ошибка: такого знака не существует"
                                    } 
                                } 
                            }
                            break;
                        default:
                            data = {
                                response: {
                                    type: "text",
                                    text: "Неизвестная команда. Отправь боту /help, чтобы узнать список доступных функций."
                                }
                            }
                            break;
                    }
                }
            }else{
                data = {
                    response: {
                        type: "text",
                        text: "Ошибка: сообщение не содержит текста"
                    }
                }
                
            }
            callback(data);
        })
    }

    /**
     * Если параметр text является командой Telegram-бота, возвращает true, иначе возвращает false
     * @param {string} text 
     * @returns {boolean}
     */
    isCommand(text){
        return (text.startsWith("/")) ? true : false;
    }

    /**
     * Если параметр text является знаком зодиака, возвращает true, иначе возвращает false
     * @param {string} text 
     * @returns {boolean}
     */
    isZodiacSign(text){
        let zodiacSigns = ["овен", "телец", "близнецы", "рак", "лев", "дева", "весы", "скорпион", "стрелец", "козерог", "водолей", "рыбы"];
        return (zodiacSigns.indexOf(text.toLowerCase()) == -1) ? false : true;
    }
}