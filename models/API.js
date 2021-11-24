const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/**
 * Запрос к API случайных картинок котиков
 * @returns {Promise} Возвращает промис, содержащий строку с src фотографии
 */
module.exports.getRandomCatPicture = async function(){

    //  Инициализация объекта XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // Обработчик изменения состояния готовности
    xhr.onreadystatechange = function () {

        //  Если получен ответ
        if (xhr.readyState == 4 && xhr.status == 200) {

            // Извлекаем и возвращаем из JSON ответа ссылку на картинку с котиком
            return JSON.parse(xhr.responseText).file;

        }

    }

    //  Инициализация нового XHR-запроса
    xhr.open("GET", "https://aws.random.cat/meow");

    //  Отправка XHR-запроса
    xhr.send();
    
}

/**
 * Запрос к API случайных картинок пёсиков
 * @returns {Promise} Возвращает промис, содержащий строку с src фотографии
 */
module.exports.getRandomDogPicture = function(){

    return new Promise((resolve, reject)=>{

        //  Инициализация объекта XMLHttpRequest
        const xhr = new XMLHttpRequest();

        // Обработчик изменения состояния готовности
        xhr.onreadystatechange = function () {

            //  Если получен ответ
            if (xhr.readyState == 4 && xhr.status == 200) {

                // Извлекаем и возвращаем из JSON ответа ссылку на картинку с пёсиком
                resolve(JSON.parse(xhr.responseText).message);

            }

        }

        //  Инициализация нового XHR-запроса
        xhr.open("GET", "https://dog.ceo/api/breeds/image/random");

        //  Отправка XHR-запроса
        xhr.send();

    });

}