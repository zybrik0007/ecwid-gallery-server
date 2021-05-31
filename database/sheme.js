const Sequelize = require('sequelize')
const connect = require('./configuration')
const config = require('../configuration/congiguration')

const Gallery = connect.sequelize.define(config.dataSchemaName, {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    width: {
        type: Sequelize.STRING,
        allowNull: false
    },
    height: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Gallery.sync()
    .then(() => {console.log('add Gallery ')})
    .catch(() => {console.log('error Gallery ')})

module.exports.Gallery = Gallery
