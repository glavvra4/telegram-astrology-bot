const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports.getRandomCatPicture = function(){
    return new Promise((resolve, reject)=>{
        //  Инициализация объекта XMLHttpRequest
        const xhr = new XMLHttpRequest();

        // Обработчик изменения состояния готовности
        xhr.onreadystatechange = function () {
            //  Если получен ответ
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Извлекаем и возвращаем из JSON ответа ссылку на картинку с котиком
                resolve(JSON.parse(xhr.responseText).file);
            }
        }

        //  Инициализация нового XHR-запроса
        xhr.open("GET", "https://aws.random.cat/meow");

        //  Отправка XHR-запроса
        xhr.send();
    });
}

module.exports.getRandomDogPicture = function(){
    return new Promise((resolve, reject)=>{
        //  Инициализация объекта XMLHttpRequest
        const xhr = new XMLHttpRequest();

        // Обработчик изменения состояния готовности
        xhr.onreadystatechange = function () {
            //  Если получен ответ
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Извлекаем и возвращаем из JSON ответа ссылку на картинку с пёсиком
                resolve(JSON.parse(xhr.responseText).message)
            }
        }

        //  Инициализация нового XHR-запроса
        xhr.open("GET", "https://dog.ceo/api/breeds/image/random");

        //  Отправка XHR-запроса
        xhr.send();
    });
}