const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const multer  = require("multer");
const routerJSON = require('./routing/routerJSON');
const routerImage = require('./routing/routerImage');


const upload = multer({ dest: 'uploads/' })


const server = express()
const port = 4000;
server.use(cors());

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use('/images', express.static(__dirname + '/public'));

server.use('/image', routerImage);
server.use('/image/id', routerImage);
server.use('/json', upload.single('file'), routerJSON);

server.get('/', routerImage)





server.listen(port)

