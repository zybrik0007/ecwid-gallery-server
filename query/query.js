const probe = require('probe-image-size');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

class Query {

    /*Получение данных изображения по URL*/
    async verificationPhoto(req) {
        try {
            return await probe(req);
        } catch (err) {
            return err;
        }
    }

    /*Получение изображения по URL*/
    async getPhoto(req) {
        try {
            return await axios({
                url: req,
                method: 'GET',
                responseType: 'stream'
            })
        } catch (err) {
            return err;
        }
    }

    async putPhotoDirectory(req, id) {
        try {
            return await req.pipe(fs.createWriteStream(path.resolve(__dirname, '../public', id + '.jpg')))
        } catch (err) {
            return err;
        }
    }

    async deletePhotoDirectory(id) {
        try {
           return await fs.unlinkSync(path.resolve(__dirname, './public' , id + '.jpg'))
        } catch (err) {
            return err
        }
    }
}

module.exports = Query;
