const connect = require('./configuration');
//import {sequel} from './configuration.js';



connect.sequelize
    .authenticate()
    .then(() => {
        console.log('Соединение установлено.');
    })
    .catch(err => {
        console.error('Ошибка соединения:', err);
    });
