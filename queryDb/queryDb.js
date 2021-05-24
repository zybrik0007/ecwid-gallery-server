const gallery = require('../database/sheme').Gallery
const Sequilize = require('sequelize')

class queryDb {

    /*Добавление данных в базу данных*/

    async photoPUT(req) {
        try {
            const insert =  await gallery.create({width: req.width, height: req.height})
            return insert['id'];
        }catch (err) {
            return err
        }
    }

    async photoDestroy(req) {
        try {
            return await gallery.destroy({
                where: {
                    id: req
                }
            })
        } catch (err) {
            return err;
        }
    }

    async searchPhotoId(req) {
        try {
            return await gallery.findOne({
                where: {
                    id: req
                }
            })
        } catch (err) {
            return err;
        }
    }

    async getPhotosDB(req) {
        console.log(req)
        try {
            return await gallery.findAll({
                order: [['id', 'DESC']],
                limit: 50,
                offset: (Number(req) - 50)
            });
        } catch (err) {
            console.log('err data getPhotosDB')
        }
    }

    async getCount () {
        try {
            return await gallery.findOne({
                attributes: [[Sequilize.fn('COUNT', Sequilize.col('*')), 'count']]
            });
        } catch (e) {
            console.log('err getCount')
        }
    }
}

module.exports = queryDb;
