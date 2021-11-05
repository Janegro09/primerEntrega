const { Router } = require('express');
const Contenedor = require('../archivos');
const carrito = new Contenedor('carrito.json');
const productos = new Contenedor('productos.json');
const validarId = require('../midleware/validarId');

const routerCarrito = Router();

routerCarrito.post('/', (req, res) => {

    const nuevoCarrito = {
        timestamp: Date.now(),
        producto:[]
    }
    const id = carrito.save(nuevoCarrito);
    
    res.send({id})
})

routerCarrito.delete('/:id', (req, res) => {

    const id = parseInt(req.params.id);
    const nuevoCarrito = []
    //Validamos el id
    
    let all = carrito.getAll();
    validarId(id, all.length);
   
    for (let i = 0; i < all.length; i++) {
        const element = all[i];
        if(element.id===id) {
            //Vaciamos el carrito
        } else {
            nuevoCarrito.push(element);
        }
    }
    carrito.crear("carrito.json",nuevoCarrito);
    res.send('delete ok')
})

routerCarrito.get('/:id/productos', (req, res) => {

    const all = carrito.getAll();
    const id = parseInt(req.params.id);
    //Validamos el id

    validarId(id, all.length);

    const carritoActual = carrito.getById(id)

    res.send(carritoActual.producto)
})

routerCarrito.post('/:id/productos', (req, res) => {

    const nuevoProductos = [];
    const id = parseInt(req.params.id);
    //Validamos el id

    const all = carrito.getAll();

    validarId(id, all.length);
    
    const idProducto = req.body.id;
    const productoAgregar   = productos.getById(idProducto); 
    
    for (let i = 0; i < all.length; i++) {
        const element = all[i];
        if(element.id===id) {
            element.producto.push(productoAgregar);
            nuevoProductos.push(element);
        } else {
            nuevoProductos.push(element);
        }
    }

    carrito.crear("carrito.json",nuevoProductos);

    res.json({mensaje:"agregado ok"})
})

routerCarrito.delete('/:id/productos/:id_prod', (req, res) => {

    const nuevoProductos = [];
    const nuevoCarrito = [];
    const id = parseInt(req.params.id);
    const idProducto = parseInt(req.params.id_prod);
    //Validamos el id

    const all = carrito.getAll();
    const allProduct = productos.getAll();

    validarId(id, all.length);
    validarId(idProducto, allProduct.length);

    for (let i = 0; i < all.length; i++) {
        const element = all[i];
        if(element.id===id) {
            for (let j = 0; j < element.producto.length; j++) {
                const elem = element.producto[j];
                console.log(idProducto, elem.id)
                if(elem.id !== idProducto){
                    nuevoProductos.push(elem);
                }
            }
            element.producto = nuevoProductos;
            nuevoCarrito.push(element);
        } else {
            nuevoCarrito.push(element);
        }
    }
    carrito.crear("carrito.json",nuevoCarrito);

    res.json({mensaje:"eliminado ok"})
})

exports.routerCarrito = routerCarrito;
