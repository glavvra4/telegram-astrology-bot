//  Импорт сущности пользователя в БД
const UserEntity = require("./db").User;

// Класс пользователя
module.exports = class User {
    
    /**
     * @param {number} telegramId Идентификатор пользователя в Telegram
     */
    constructor(telegramId){
        this._telegramId = telegramId;   
    }

    /**
     * Метод инициализации объекта пользователя. Ищет в базе данных
     * документ по идентификатору Telegram. Если не находит - создает 
     * документ с параметрами по умолчанию, если находит - пропускает 
     * данный шаг. Записывает все полученные или созданные данные, затем
     * присваивает их классу и вызывает callback 
     * 
     * @param {Function} callback
     */
    init(callback){
        const telegramId = this._telegramId;
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
                                name: "none",
                                data: {}
                            },
                            zodiacSign: "unknown"
                        }
        
                        //  Создаем объект сущности
                        const user = new UserEntity(data);
        
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

    //Геттеры и сеттеры
  
    get telegramId(){
        return this._telegramId;
    }

    get role(){
        return this._role;
    }

    set role(newRole){
        this._role = newRole
        UserEntity.updateOne({ telegramId: this._telegramId }, { role: newRole }, function(err, result){
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
        UserEntity.updateOne({ telegramId: this._telegramId }, { command: newCommand }, function(err, result){
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
        UserEntity.updateOne({ telegramId: this._telegramId }, { zodiacSign: newZodiacSign }, function(err, result){
            if(err){
                console.error("Ошибка транзакции: " + err);
            }
        });
    }
}