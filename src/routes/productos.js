const { Router } = require('express');
const Contenedor = require('../archivos');
const productos = new Contenedor('productos.json');

const routerProductos = Router();
const administrador = true;
routerProductos.get('/', (req, res) => {

    if(!administrador) return res.json({error:'1', descripcion:'ruta x metodo y no autorizada'});

    let all = productos.getAll()
    res.send(all)
})

routerProductos.get('/:id', (req, res) => {

    if(!administrador) return res.json({error:'1', descripcion:'ruta x metodo y no autorizada'});

    const id = parseInt(req.params.id);
    const all = productos.getAll();
    //Validamos el id
    if(id > all.length) {
        res.json({error:'producto no encontrado'})
    }
    if(id <= 0) {
        res.json({error:'producto no encontrado'})
    }
    if(isNaN(id)) {
        res.json({error:'producto no encontrado'})
    }

    const producto = productos.getById(id)

    res.send(producto)
})

routerProductos.post('/', (req, res) => {

    if(!administrador) return res.json({error:'1', descripcion:'ruta x metodo y no autorizada'});

    const {id, nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const adjunto = {
        id,
        timestamp: Date.now(),
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock
    }
    const id = productos.save(adjunto);
    
    res.send({id,title,price,thumbNail})
})

routerProductos.put('/:id', (req, res) => {

    if(!administrador) return res.json({error:'1', descripcion:'ruta x metodo y no autorizada'});

    const id = parseInt(req.params.id);
    const nuevoProductos = []
    //Validamos el id
    if(id <= 0) {
        res.json({error:'producto no encontrado'})
    }
    if(isNaN(id)) {
        res.json({error:'producto no encontrado'})
    }

    let all = (productos.getAll())

    if(id > all.length) {
        res.json({error:'producto no encontrado'})
    }
    const {title, price, thumbNail} = req.body;
    const adjunto = {
        title,
        price,
        thumbNail,
        id
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

    if(!administrador) return res.json({error:'1', descripcion:'ruta x metodo y no autorizada'});

    const id = parseInt(req.params.id);
    const nuevoProductos = []
    //Validamos el id
    if(id <= 0) {
        res.json({error:'producto no encontrado'})
    }
    if(isNaN(id)) {
        res.json({error:'producto no encontrado'})
    }

    let all = (productos.getAll())

    if(id > all.length) {
        res.json({error:'producto no encontrado'})
    }
    
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
