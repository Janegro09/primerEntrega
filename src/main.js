const { urlencoded } = require('express');
const express = require('express');
const app = express();
const { routerProductos } = require('./routes/productos')
const { routerCarrito } = require('./routes/carrito')


const port = process.env.PORT | 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('../public'));


app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)

const server = app.listen(port, () => {
    console.log(`Corriendo en http://localhost:${port}`)
  });

server.on('error', error => console.log(`Error en servidor ${error}`));

  