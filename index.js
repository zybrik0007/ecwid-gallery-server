const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const multer  = require("multer");
const routerJSON = require('./routing/routerJSON');
const routerImage = require('./routing/routerImage');
const path = require('path')


const upload = multer({ dest: 'uploads/' })


const server = express()
const port = 4000;
server.use(cors());

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use('/images', express.static(__dirname + '/public'));
server.use(express.static(path.join(__dirname, 'build')));
server.use('/json', upload.single('file'), routerJSON);

server.use('/get', routerImage)
server.use('/put', routerImage)
server.use('/delete', routerImage)

/*server.use('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});*/






server.listen(port)

