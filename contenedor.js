let fs =require ("fs");
let path = require("path");

class Contenedor {
    constructor(url_){
        this.url = url_;
    }

    async save(producto){//guardar y devolver el id del producto
        try{
            let data = await this.getAll();
            let newId = await this.getNewId(data);
            let newProducto = {id: newId, ...producto};
            data.push(newProducto);
            let content = JSON.stringify(data, null,2);
            await fs.promises.writeFile(this.url, content);

            return newId;
           // await fs.writeFileSync(this.url, JSON.stringify(data));
        }catch(error){
            console.log(error);
        }
    }
    async update(producto){//modificar y devolver el id del producto
        try{
            let resp = [];
            let data = await this.getAll();
            for(const key in data){
                if(data[key].id == producto.id){
                    data.splice(key, 1);
                }
                //console.log(data);
            }
            data.push(producto);
            let content = JSON.stringify(data, null,2);
            await fs.promises.writeFile(this.url, content);

            return newId;
           // await fs.writeFileSync(this.url, JSON.stringify(data));
        }catch(error){
            console.log(error);
        }
    }
    async getNewId(productos){
        try{
            let resp = productos.reduce((max, producto) => {
                return producto.id > max ? producto.id : max;
            }, 0);
            return resp + 1;
        }catch(error){
            console.log(error);
        }
    }

    async  getAll(){
        try{
            let data = await fs.promises.readFile(this.url,'utf-8');
            return JSON.parse(data);
        }catch(error){
            return [];
        }
    }
    async deleteById(id){
        try{
            let resp = [];
            let data = await this.getAll();
            for(const key in data){
                if(data[key].id == id){
                    data.splice(key, 1);
                }
                console.log(data);
            }

            // let index = data.findIndex(x => x.id == id);
            // if(index != -1){
            //     data.splice(index, 1);
            // }
            let content = JSON.stringify(data, null,2);
            await fs.promises.writeFile(this.url, content);//JSON.stringify(content));
            return data;
        }catch(error){
            throw error;
            console.log(error);
        }
    }
   async getbyId(id){
        try{
            let resp = [];
            let data = await this.getAll();
            return data.find(x => x.id == id);
            
        }catch(error){
            console.log(error);
        }
    }

}

module.exports = Contenedor;

