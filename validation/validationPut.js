const errors = require('../errors/errors');

class validationPut {

    /*Провера формата json файла*/
    async putJsonType(req) {
        try {
            if(req !== 'application/json') {
                return {res: new Error(), error: errors.JSON}
            }
        } catch (err) {
            return {res: new err, error: errors.JSON}
        }
    }

    /*Проверка параметров json файла*/
    async putJsonParams(req) {
        let arrObj = [];
        let arrayFilterObj = [];

        if(!req.hasOwnProperty('galleryImages')) {
            return {res: new Error(), error: errors.formatJSON}
        }

        if(!(req['galleryImages'] instanceof Array)) {
            return {res: new Error(), error: errors.formatJSON}
        }

        arrObj = req['galleryImages'];
        arrayFilterObj = arrObj.filter(obj => (obj instanceof Object));
        if(arrayFilterObj.length !== arrObj.length) {
            return {res: new Error(), error: errors.formatJSON}
        }

        arrObj = req['galleryImages'];
        arrayFilterObj = arrObj.filter(obj => obj.hasOwnProperty('url'))
        if(arrObj.length !== arrayFilterObj.length) {
            return {res: new Error(), error: errors.formatJSON}
        }

        arrObj = req['galleryImages'];
        arrayFilterObj = arrObj.filter(obj => obj.hasOwnProperty('width'))
        if(arrObj.length !== arrayFilterObj.length) {
            return {res: new Error(), error: errors.formatJSON}
        }

        arrObj = req['galleryImages'];
        arrayFilterObj = arrObj.filter(obj => obj.hasOwnProperty('height'))
        if(arrObj.length !== arrayFilterObj.length) {
            return {res: new Error(), error: errors.formatJSON}
        }

        return {res: true}
    }
}

module.exports = validationPut;