const path = require("path")
const fileURL = require("url")
const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors")
const multer = require('multer')
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cafe_sena"
});
app.post("/create", (req, res) => {
    const cedula = req.body.cedula;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const correo = req.body.correo;

    db.query('INSERT INTO usuarios(cedula, nombre, apellido, correo) VALUES(?,?,?,?)', [cedula, nombre, apellido, correo],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("usuario registrado");
            }
        }
    );
});
app.post("/createInsumos", (req, res) => {
    const codigo = req.body.codigo;
    const nombre = req.body.nombre;
    const cantidad = req.body.cantidad;
    const imagen = req.body.imagen;
    const f_ingreso = req.body.f_ingreso;
    const f_vencimiento = req.body.f_vencimiento;
    const costo = req.body.costo;

    db.query('INSERT INTO insumos(codigo, nombre, cantidad, imagen, f_ingreso, f_vencimiento, costo) VALUES(?,?,?,?,?,?,?)', [codigo, nombre, cantidad, imagen, f_ingreso, f_vencimiento, costo],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("insumo registrado");
            }
        }
    );
});
app.post("/createUtensilios", (req, res) => {
    const codigo = req.body.codigo;
    const nombre = req.body.nombre;
    const cantidad = req.body.cantidad;
    const imagen = req.body.imagen;

    db.query('INSERT INTO utensilios(codigo, nombre, cantidad, imagen) VALUES(?,?,?,?)', [codigo, nombre, cantidad, imagen],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("utensilio registrado");
            }
        }
    );
});
app.post("/createProveedores", (req, res) => {
    const nit = req.body.nit;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;

    db.query('INSERT INTO proveedores(nit, nombre, apellido, direccion, telefono) VALUES(?,?,?,?,?)', [nit, nombre, apellido, direccion, telefono],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("proveedor registrado");
            }
        }
    );
});
app.post("/createConsumidores", (req, res) => {
    const cedula = req.body.cedula;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const telefono = req.body.telefono;

    db.query('INSERT INTO consumidores(cedula, nombre, apellido, telefono) VALUES(?,?,?,?)', [cedula, nombre, apellido, telefono],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("consumidor registrado");
            }
        }
    );
});
app.post("/registrarEvento", (req, res) => {
    const codigo = req.body.codigo
    const fecha = req.body.fecha;
    const hora_inicio = req.body.hora_inicio;
    const hora_fin = req.body.hora_fin;
    const imagen = req.body.imagen;
    const descripcion = req.body.descripcion;
    const cupo = req.body.cupo;


    db.query('INSERT INTO eventos(codigo, fecha, hora_inicio, hora_fin, imagen, descripcion, cupo) VALUES(?,?,?,?,?,?,?)', [codigo, fecha, hora_inicio, hora_fin, imagen, descripcion, cupo],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("evento registrado");
            }
        }
    );
});
const dirname = path.dirname
const fileURLToPath = fileURL.fileURLToPath
const CURRENT_DIR = dirname(fileURLToPath())

const multerUpload = multer({
    dest: join(CURRENT_DIR, './public/images'),
    limits: {
        fieldSize: 1000000
    }
})

app.post("/createProductos", multerUpload.single('imagen') , (req, res) => {
    console.log(req.file);
    res.sendStatus(200)
    // const codigo = req.body.codigo;
    // const imagen = "hola";
    // const nombre = req.body.nombre;
    // const descripcion = req.body.descripcion;
    // const precio = req.body.precio;
    // const cantidad = req.body.cantidad;



    // db.query('INSERT INTO productos(codigo, imagen, nombre, descripcion, precio, cantidad) VALUES(?,?,?,?,?,?)', [codigo, imagen, nombre, descripcion, precio, cantidad],
    //     (err, result) => {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             res.send("producto registrado");
    //         }
    //     }
    // );
});
app.put("/updateProductos", (req, res) => {
    const codigo = req.body.codigo
    const imagen = req.body.imagen;
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const cantidad = req.body.cantidad;



    db.query('UPDATE productos SET codigo=?, imagen=?, nombre=?, descripcion=?, precio=?, cantidad=? WHERE codigo=?', [codigo, imagen, nombre, descripcion, precio, cantidad],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("producto actualizado");
            }
        }
    );
});
app.get("/usuarios", (req, res) => {
    let response
    db.query('SELECT * FROM usuarios',
        (err, result) => {
            if (err) {
                response = err
            } else {
                response = res.send(result);
            }
        }
    );
    return response
});
app.get("/consumidores", (req, res) => {
    let response
    db.query('SELECT * FROM consumidores',
        (err, result) => {
            if (err) {
                response = err
            } else {
                response = res.send(result);
            }
        }
    );
    return response
});
app.get("/productos", (req, res) => {
    let response
    db.query('SELECT * FROM productos',
        (err, result) => {
            if (err) {
                response = err
            } else {
                response = res.send(result);
            }
        }
    );
    return response
});
app.get("/proveedores", (req, res) => {
    let response
    db.query('SELECT * FROM proveedores',
        (err, result) => {
            if (err) {
                response = err
            } else {
                response = res.send(result);
            }
        }
    );
    return response
});
/*app.post("/create", (req, res) => {
    const Consumidor = req.body.Consumidor;
    const Pago = req.body.Pago;
    const Fecha = req.body.Fecha;
    const Producto = req.body.Producto;
    const Cantidad = req.body.Cantidad;
    const Subtotal = req.body.Subtotal;
    const Total = req.body.vSumTotal;
    const Estado = req.body.Estado;
    const Bodega = req.body.Bodega;
const data = req.body;
console.log(data)
    db.query("INSERT INTO tbl_ventas(Fecha, Id_Cliente, Id_Bodega, Neto, IVA, Forma_Pago) VALUES (?, ?, ?, ?, ?, ?)",
        [Fecha, Consumidor, Bodega, Total, Subtotal, Pago],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al registrar la factura.");
            } else {
                // Obtener el número de factura generado en la primera consulta
                const Nro_Factura = result.insertId;

                // Segunda consulta SQL
                db.query('INSERT INTO tbl_detalleventas(Nro_Factura, Cod_Producto, Cantidad, Precio_Venta, Estado) VALUES (?, ?, ?, ?, ?)',
                    [Nro_Factura, Producto, Cantidad, Total, Estado === "1" ? 1 : 0],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send("Error al registrar la factura.");
                        } else {
                            res.status(200).send("Factura registrada con éxito!!");
                        }
                    });
            }
        });
});*/
app.listen(3001, () => {
    console.log("corriendo en el puerto 3001")
})
