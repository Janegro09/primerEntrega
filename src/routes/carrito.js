const { Router } = require('express');
const Contenedor = require('../archivos');
const carrito = new Contenedor('carrito.json');
const productos = new Contenedor('productos.json');

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
    if(id <= 0) {
        res.json({error:'carrito no encontrado'})
    }

    if(isNaN(id)) {
        res.json({error:'carrito no encontrado'})
    }

    let all = carrito.getAll();

    if(id > all.length) {
        res.json({error:'carrito no encontrado'})
    }
    
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

    const id = parseInt(req.params.id);
    //Validamos el id
    if(id > all.length) {
        res.json({error:'product no encontrado'})
    }
    if(id <= 0) {
        res.json({error:'product no encontrado'})
    }
    if(isNaN(id)) {
        res.json({error:'product no encontrado'})
    }

    const carritoActual = carrito.getById(id)

    res.send(carritoActual.producto)
})

routerCarrito.post('/:id/productos', (req, res) => {

    const nuevoProductos = [];
    const id = parseInt(req.params.id);
    //Validamos el id
    if(id <= 0) {
        res.json({error:'product no encontrado'})
    }

    if(isNaN(id)) {
        res.json({error:'product no encontrado'})
    }
    
    const all = carrito.getAll();
    
    if(id > all.length) {
        res.json({error:'product no encontrado'})
    }
    const carritoActual = carrito.getById(id)

    carritoActual.producto.push(productoNuevo)

    for (let i = 0; i < all.length; i++) {
        const element = all[i];
        if(element.id===id) {
            nuevoProductos.push(carritoActual);
        } else {
            nuevoProductos.push(carritoActual);
        }
    }

    carrito.crear("carrito.json",nuevoProductos);

    res.send(carritoActual)
})

routerCarrito.delete('/:id/productos/:id_prod', (req, res) => {

    const id = parseInt(req.params.id);
    const id_prod = parseInt(req.params.id_prod);
    const carritoNUevo = []
    //Validamos el id
    if(id <= 0 || id_prod<=0) {
        res.json({error:'product no encontrado'})
    }
    if(isNaN(id) || isNaN(id_prod)) {
        res.json({error:'product no encontrado'})
    }

    let all = (carrito.getAll())

    if(id > all.length) {
        res.json({error:'product no encontrado'})
    }
    
    for (let i = 0; i < all.length; i++) {
        const element = all[i];
        if(element.id===id) {
            nuevoProductos = [];
            for (let j = 0; j < element.producto.length; j++) {
                const elem = element.producto[j];
                if(elem.id===id_prod){
                    continue
                }
                nuevoProductos.push(elem)
            }
            carritoNUevo.push(nuevoProductos);

        } else {
            carritoNUevo.push(element);
        }
    }
    carrito.crear("carrito.json",carritoNUevo);
    res.send('delete ok')
})

exports.routerCarrito = routerCarrito;
