const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multiparty = require('connect-multiparty');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;
var router = express.Router();

app.use('/api', router);
     /*insira as rotas aqui */
     

router.route('/upload').post(multiparty(), require('../src/controller/upload'));


app.use('/enviados', express.static(__dirname  + '/uploads'));

app.listen(port);
    
console.log('conectado a porta ' + port);