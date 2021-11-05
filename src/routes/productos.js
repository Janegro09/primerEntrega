const { Router } = require('express');
const Contenedor = require('../archivos');
const productos = new Contenedor('productos.json');
const validarId = require('../midleware/validarId');

const routerProductos = Router();
routerProductos.get('/', (req, res) => {

    let all = productos.getAll()
    res.send(all)
})

routerProductos.get('/:id', (req, res) => {
    // if(!administrador) return res.json({error:'1', descripcion:'ruta x metodo y no autorizada'});

    const id = parseInt(req.params.id);
    const all = productos.getAll();
    //Validamos el id
    validarId(id, all.length);

    const producto = productos.getById(id)

    res.send(producto)
})

routerProductos.post('/', (req, res) => {

    const {nombre, descripcion, codigo, foto, precio, stock, administrador } = req.body;
    if(!administrador) return res.json({error:'1', descripcion:'ruta x metodo y no autorizada'});

    const adjunto = {
        timestamp: Date.now(),
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock
    }
    const id = productos.save(adjunto);
    
    res.send({id})
})

routerProductos.put('/:id', (req, res) => {

    const {nombre, descripcion, codigo, foto, precio, stock, administrador } = req.body;

    if(!administrador) return res.json({error:'1', descripcion:'ruta x metodo y no autorizada'});

    const id = parseInt(req.params.id);
    const nuevoProductos = []
    let all = (productos.getAll())
    //Validamos el id
    validarId(id, all.length);

    const adjunto = {
        timestamp: Date.now(),
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock
    }
    
    for (let i = 0; i < all.length; i++) {
        const element = all[i];
        if(element.id===id) {
            nuevoProductos.push(adjunto);
        } else {
            nuevoProductos.push(element);
        }
    }
    productos.crear("productos.json",nuevoProductos);

    res.send('actualizado ok')
})

routerProductos.delete('/:id', (req, res) => {

    const { administrador } = req.body;

    if(!administrador) return res.json({error:'1', descripcion:'ruta x metodo y no autorizada'});

    const id = parseInt(req.params.id);
    const nuevoProductos = []
    let all = (productos.getAll())

    //Validamos el id
    validarId(id, all.length);
    
    for (let i = 0; i < all.length; i++) {
        const element = all[i];
        if(element.id===id) {

        } else {
            nuevoProductos.push(element);
        }
    }
    productos.crear("productos.json",nuevoProductos);
    res.send('delete ok')
})

exports.routerProductos = routerProductos;
