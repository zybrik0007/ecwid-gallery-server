const Sequelize = require('sequelize')

const sequelize = new Sequelize('gallery', 'root', '',
    {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        define: {
            timestamps: false
        }
    });

sequelize.createSchema('gallery').then(() => console.log('Shema gallery add')).catch(() => console.log('Schema gallery no add'))



module.exports.sequelize = sequelize;

