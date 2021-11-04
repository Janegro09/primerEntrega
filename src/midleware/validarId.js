if(id <= 0) {
    res.json({error:'carrito no encontrado'})
}
if(isNaN(id)) {
    res.json({error:'carrito no encontrado'})
}

let all = (carrito.getAll())

if(id > all.length) {
    res.json({error:'carrito no encontrado'})
}


module.exports = validarId;
