
const validarId = (id, largo) => {

    if(id <= 0) {
        res.json({error:'carrito no encontrado'})
    }
    if(isNaN(id)) {
        res.json({error:'carrito no encontrado'})
    }
    
    
    if(id > largo) {
        res.json({error:'carrito no encontrado'})
    }
    
    return true
} 

module.exports = validarId;