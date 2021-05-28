const Router = require('router');
const path = require('path');
const fs = require('fs');

const validationPUT = require('../validation/validationPut');
const queryDbClass = require('../queryDb/queryDb');
const errors = require('../errors/errors');
const queryClass = new require('../query/query');

const routerJSON = new Router();
const validation = new validationPUT();
const queryDb = new queryDbClass();
const query = new queryClass();

/*Добавление изображения по JSON*/
routerJSON.put('/',
    async (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        const file = await req.file;

        /*Проверка типа файла*/
        const fileType = await validation.putJsonType(file.mimetype);
        if(fileType instanceof Error) {
            res.status(501);
            res.send({error: fileType.error})
            return;
        }

        /*Парсинг входящих данных*/
        let reqParser;
        try {
            reqParser = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../uploads', file.filename)));
        } catch {
            res.status(501);
            res.send({error: errors.parseJSON})
            return;
        }

        /*Проверка параметров JSON файла*/
        try {
            const validationParseFile = await validation.putJsonParams(reqParser);
            console.log('validationParseFile: ', validationParseFile)
            if(validationParseFile.res instanceof Error) {
                res.status(501);
                res.send({error: validationParseFile.error})
                return;
            }
        } catch {
            res.status(501);
            res.send({error: errors.validationError})
            return;
        }

        /*Запись данных в базу данных и директорию хранения изобажений*/
        const fileInputLenght = reqParser['galleryImages'].length;
        let fileOutputLenght = 0;
        for (const obj of reqParser['galleryImages']) {
            const parametersPhoto = await query.verificationPhoto(obj.url);
            if(parametersPhoto instanceof Error) {
                continue;
            }
            const insert = await  queryDb.photoPUT({width: parametersPhoto.width, height: parametersPhoto.height});
            if(insert instanceof Error) {
                continue;
            }
            const responseUrl = await query.getPhoto(obj.url);
            if(responseUrl instanceof Error) {
                await queryDb.photoDestroy(insert);
                continue;
            }
            const responseDirectory = await query.putPhotoDirectory(responseUrl.data, insert);
            if(responseDirectory instanceof Error) {
                await queryDb.photoDestroy(insert);
                continue;
            }
            fileOutputLenght = fileOutputLenght + 1;
        }

        if (fileOutputLenght === 0) {
            res.status(500);
            res.send({error: errors.noAddPhoto})
        }
        if(fileOutputLenght < fileInputLenght) {
            const idx = fileInputLenght - fileOutputLenght;
            res.status(500);
            res.send({error: errors.noAddPhotod})
        }

        await fs.unlinkSync(path.resolve(__dirname, '../uploads', file.filename));

        res.status(200);
        res.send({})
    });

module.exports = routerJSON;
