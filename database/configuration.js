const Sequelize = require('sequelize')
const config = require('../configuration/congiguration')

const sequelize = new Sequelize(config.dataBaseName, config.dataBaseLogin, config.dataBasePassword,
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

sequelize.createSchema(config.dataSchemaName)
    .then(() => {console.log('Schema add')})
    .catch((err)=>{console.log('Schema err', err)})


module.exports.sequelize = sequelize;

