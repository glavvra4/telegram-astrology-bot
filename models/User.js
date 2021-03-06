//  Импорт сущности пользователя в БД
const UserEntity = require("./db").User;

// Класс пользователя
module.exports = class User {
    //  Конструктор класса, 
    constructor(telegramId){
        this._telegramId = telegramId;   
    }

    /**
     * Метод инициализации объекта пользователя. Ищет в базе данных
     * документ по идентификатору Telegram. Если не находит - создает 
     * документ с параметрами по умолчанию, если находит - пропускает 
     * данный шаг. Записывает все полученные или созданные данные
     * присваивает классу и вызвыает классу 
     */
    init(callback){
        let telegramId = this._telegramId;

        //  Создание промиса транзакции для бд
        let transaction = new Promise((resolve, reject)=>{
            //  Поиск пользователя по telegramId
            UserEntity.findOne({ telegramId: telegramId }, function(err, data){
                if(err){
                    reject("Ошибка транзкции: " + err);
                }else{
                    //  Если пользователь не найден - создаем его
                    if(data == null){
                        //  Объект с данными по умолчанию
                        data = {
                            telegramId: telegramId,
                            role: "current",
                            command: {
                                name: "/start",
                                data: {}
                            },
                            zodiacSign: "unknown"
                        }
        
                        //  Создаем объект сущности
                        const user = new UserEntity({
                            telegramId: data.telegramId,
                            role: data.role,
                            command: data.command,
                            zodiacSign: data.zodiacSign
                        });
        
                        //  Сохраняем данные в БД
                        user.save(function(err){
                            if(err){ reject("Ошибка при создании документа User: " + err) }
                        });
                    }
                    
                    //Возвращаем данные
                    resolve(data);
                }
            });
        });

        //  Callback-функция промиса
        transaction.then(
            (user)=>{
                //  Сохраняем данные в класс
                this._role = user.role;
                this._command = user.command;
                this._zodiacSign = user.zodiacSign;
                //  Вызов callback, заданного параметрами функции
                callback()
            },
            reason => { console.error("Транзакция прервана: " + reason) }
        );
       
    }

    /**
     *  Геттеры и сеттеры
     */    

    get telegramId(){
        return this._telegramId;
    }

    get role(){
        return this._role;
    }

    set role(newRole){
        this._role = newRole
        User.updateOne({ telegramId: this._telegramId }, { role: newRole }, function(err, result){
            if(err){
                console.error("Ошибка транзакции: " + reason);
            }
        });
    }

    get command(){
        return this._command;
    }

    set command(newCommand){
        this._command = newCommand
        User.updateOne({ telegramId: this._telegramId }, { command: newCommand }, function(err, result){
            if(err){
                console.errror("Ошибка транзакции: " + err );
            }
        });
    }

    get zodiacSign(){
        return this._zodiacSign;
    }

    set zodiacSign(newZodiacSign){
        this._zodiacSign = newZodiacSign
        User.updateOne({ telegramId: this._telegramId }, { zodiacSign: newZodiacSign }, function(err, result){
            if(err){
                console.error("Ошибка транзакции: " + err);
            }else{
                resolve(result);
            }
        });
    }
}