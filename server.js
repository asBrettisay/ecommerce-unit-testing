var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    products = require('./controllers/productsCtrl');

app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

var port = 3000
app.listen(port, function() {
  console.log('A Lannister always pays his debts...')
})


app.post('/products', products.create);

app.get('/products', products.index);
app.get('/products/:id', products.show);

app.put('/products/:id', products.update);

app.delete('/products/:id', products.delete);
