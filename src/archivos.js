const fs = require('fs');

class Contenedor {

    constructor( nombreArchivo ){

        this.nombre     = nombreArchivo;

    }

    crear(nombre, datos) {
        try {
            fs.writeFileSync(nombre,JSON.stringify(datos),'utf-8');
        } catch (error) {
            console.log(error)
        }
    }

    save( datos ) {
        try {
            const all = this.getAll();
            datos.id = all[all.length -1].id +1;
            all.push(datos);
            fs.writeFileSync(this.nombre,JSON.stringify(all),'utf-8');

            return nuevo.id;
        } catch (error) {
            console.log(error);
        }
    };

    getById( id ) {
        try {
            let arrayData = this.getAll();

            return arrayData[id-1];
        } catch (error) {
            console.log(error);
        }
    };

    getAll() {
        console.log(this.nombre)
        try {
            let data = fs.readFileSync(this.nombre,'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.log(error);
        }
    };

    deleteById( idArchivo ) {
        try {
            const arrayData = this.getAll();
            this.deleteAll();
            arrayData.forEach(elem => {
                let valor = JSON.parse(elem);    
                if(valor.id != idArchivo) {
                    this.save(valor, valor.id);
                }
            });
            console.log("quitamos el elemento del archivo")

        } catch (error) {
            console.log(error);
        }

    };

    deleteAll(){
        try {
            fs.writeFileSync(this.nombre, "");
            console.log("lo limpiamos");
            
        } catch (error) {
            console.log(error);
        }
    };

}

module.exports = Contenedor;