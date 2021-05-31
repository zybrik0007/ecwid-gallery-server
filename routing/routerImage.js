const Router = require('router');

const queryDbClass = require('../queryDb/queryDb');
const errors = require('../errors/errors');
const queryClass = new require('../query/query');

const routerImage = new Router();
const queryDb = new queryDbClass();
const query = new queryClass();


/*Добавление изображения по URL*/
routerImage.put('/', async (req, res) => {
    const request = await req;
    console.log(request.body.request)
    /*Полуение параметров изображения*/
    const imageParams = await query.verificationPhoto(request.body.request);
    if(imageParams instanceof Error) {
        res.status(501)
        res.send({error: errors.noAddPhotoOne})
        return;
    }

    /*Добавление информации об изображении в базу данных*/
    const insert = await queryDb.photoPUT({width: imageParams.width, height: imageParams.height});
    if (insert instanceof Error) {
        res.status(501)
        res.send({error: errors.errorDatabasePutImage})
        return;
    }
    /*Получение изображения по URL*/
    const responseUrl = await query.getPhoto(request.body.request);
    if(responseUrl instanceof Error) {
        await queryDb.photoDestroy(insert);
        res.status(501)
        res.send({error: errors.noAddPhotoOne})
        return;
    }

    /*Запись изображения в директорию*/
    const responseDirectory = await query.putPhotoDirectory(responseUrl.data, insert);
    if(responseDirectory instanceof Error) {
        await queryDb.photoDestroy(insert);
        res.status(501)
        res.send({error: errors.noAddPhotoOne})
        return;
    }
    res.status(200)
    res.send({})

})

/*Удаление изображения по id*/
routerImage.delete('/', async (req, res) => {
    const request = await req;
    /*Удаление из базы данных*/
    const response = await queryDb.photoDestroy(request.body.id)

    if (response instanceof Error) {
        res.status(500);
        res.send({error: errors.errorDelete})
        return;
    }
    /*Удаление из директриии*/
    const responseDirectory = await query.deletePhotoDirectory(request.body.id);
    if (responseDirectory instanceof Error) {
        res.status(501)
        res.send({error: errors.errorDeleteDirectory})
        return;
    }
    res.status(200)
    res.send({})
})

routerImage.get('/', async (req, res) => {
    console.log('123')
    const request = await req;
    const response = await queryDb.getPhotosDB(request.query.count);
    const responseString = JSON.stringify({photos: response});
    res.status(200);
    res.send(responseString)
})
/*Получение изображения по id*/
routerImage.get('/image/id', async (req, res) => {
    const response = await req.query.id
    const search = await queryDb.searchPhotoId(req.query.id)
    res.status(200)
    res.send({search})
})

/*Получение суммы всех изображений*/
routerImage.get('/image/count', async(req, res) => {
    const response = await queryDb.getCount()
    res.status(200);
    res.send(response)
})


module.exports = routerImage;
