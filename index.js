let Contenedor = require('./contenedor');
let path = require('path');
let express = require('express');
//const bodyParser = require('body-parser');
let app = express();
let {Router} = express;
let router = new Router;
let router_id = new Router;

let contenedor = new Contenedor("./productos.txt");
const PORT = process.env.PORT || 3000;


router.get("/", (req,res,next) => {
    contenedor.getAll().then(data => {
        res.send(data);
    }).catch(error => {
        res.send(error);
    });
});
app.use(express.urlencoded());
app.use(express.json());

router.post("/",(req,res,next) => {
    //console.log(req.body.producto);
    console.log(req.body.producto.precio);
    contenedor.save(req.body.producto).then(data => { 
        res.json(data);
        }).catch(error => {
            res.send(error);
            });
            });
        
router_id.get("/:id", (req,res,next) => {
    let id = req.params.id;    
    
    contenedor.getbyId(id).then(data => {
        if(data){
            res.send(data);
        }else{
            res.send("{error: producto no encontrado}");  //no existe el producto
        }
       
    }).catch(error => {
        res.send(error);
    });
});
router.delete("/:id", (req,res,next) => {
    let id = req.params.id;
    contenedor.deleteById(id).then(data => {
        res.send(data);
    }).catch(error => {
        res.send(error);
    });
});

router_id.put("/:id",(req,res,next) => {
    let id = req.params.id;
    let producto = req.body.producto;
    contenedor.update(producto).then(data => {
        res.send(data);
    }).catch(error => {
        res.send(error);
    });
});

app.use("/api/productos", router);
app.use("/api/productos", router_id);
app.use("/api",express.static(path.join(__dirname, 'public','html')));
app.use("/api",express.static(path.join(__dirname, 'public','edit.html')));
app.get("/", (req,res,next) => {
    
    res.send("<h1>Bienvenido a la tienda de productos</h1>");
    });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});


function editar(req, res) {
    contenedor.update({_id: req.params.id}).exec(function (err, product) {
      if (err) { console.log("Error:", err); return; }
      
      res.render("../api/productos/", {product: product});
      
    });
  };