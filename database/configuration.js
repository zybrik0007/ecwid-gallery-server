const Sequelize = require('sequelize')

const sequelize = new Sequelize('gallery', 'root', '123456',
    {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        define: {
            timestamps: false
        }
    });


module.exports.sequelize = sequelize;

