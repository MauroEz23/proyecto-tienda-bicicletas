// ============================================================
// PROYECTO 1 - DESARROLLO CON PLATAFORMAS ABIERTAS
// Base de datos: Tienda de Bicicletas
// Autores: Mauro Rodriguez, Yannela Castillo
// Fecha: Octubre 2026
// ============================================================

const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const nombreDB = "tienda_bicicletas";

const cliente = new MongoClient(url);

async function main() {
  try {
    await cliente.connect();
    console.log("Conectado a MongoDB correctamente");

    const db = cliente.db(nombreDB);

    const marcas = db.collection("marcas");
    const bicicletas = db.collection("bicicletas");
    const usuarios = db.collection("usuarios");
    const ventas = db.collection("ventas");

    console.log("Colecciones listas");

    // Limpiar colecciones
    await marcas.deleteMany({});
    await bicicletas.deleteMany({});
    await usuarios.deleteMany({});
    await ventas.deleteMany({});
    console.log("Colecciones limpias");

    // ============================================================
    // INSERTAR MARCAS
    // ============================================================
    const resultadoMarcas = await marcas.insertMany([
      { nombre: "Trek", pais_origen: "Estados Unidos", fundacion: 1975, sitioWeb: "https://www.trekbikes.com" },
      { nombre: "Specialized", pais_origen: "Estados Unidos", fundacion: 1974, sitioWeb: "https://www.specialized.com" },
      { nombre: "Giant", pais_origen: "Taiwan", fundacion: 1972, sitioWeb: "https://www.giant-bicycles.com" },
      { nombre: "Cannondale", pais_origen: "Estados Unidos", fundacion: 1971, sitioWeb: "https://www.cannondale.com" },
      { nombre: "Scott", pais_origen: "Suiza", fundacion: 1958, sitioWeb: "https://www.scott-sports.com" },
      { nombre: "Bianchi", pais_origen: "Italia", fundacion: 1885, sitioWeb: "https://www.bianchi.com" }
    ]);
    console.log(`${resultadoMarcas.insertedCount} marcas insertadas`);

    // ============================================================
    // INSERTAR BICICLETAS
    // ============================================================
    const trek = await marcas.findOne({ nombre: "Trek" });
    const specialized = await marcas.findOne({ nombre: "Specialized" });
    const giant = await marcas.findOne({ nombre: "Giant" });
    const cannondale = await marcas.findOne({ nombre: "Cannondale" });
    const scott = await marcas.findOne({ nombre: "Scott" });
    const bianchi = await marcas.findOne({ nombre: "Bianchi" });

    const resultadoBicis = await bicicletas.insertMany([
      { modelo: "Marlin 5", idMarca: trek._id, tipo: "Montana", precio: 650.00, stock: 12, especificaciones: { color: "Rojo", talla: "M", peso: "14.5 kg" } },
      { modelo: "Domane AL 2", idMarca: trek._id, tipo: "Ruta", precio: 850.00, stock: 8, especificaciones: { color: "Negro", talla: "L", peso: "10.2 kg" } },
      { modelo: "Allez Sport", idMarca: specialized._id, tipo: "Ruta", precio: 1000.00, stock: 6, especificaciones: { color: "Azul", talla: "S", peso: "9.8 kg" } },
      { modelo: "Rockhopper Comp", idMarca: specialized._id, tipo: "Montana", precio: 750.00, stock: 10, especificaciones: { color: "Verde", talla: "M", peso: "13.9 kg" } },
      { modelo: "Revel 1", idMarca: giant._id, tipo: "Montana", precio: 550.00, stock: 15, especificaciones: { color: "Gris", talla: "L", peso: "14.1 kg" } },
      { modelo: "Contend AR 3", idMarca: giant._id, tipo: "Ruta", precio: 900.00, stock: 7, especificaciones: { color: "Blanco", talla: "M", peso: "9.5 kg" } },
      { modelo: "Trail 8", idMarca: cannondale._id, tipo: "Montana", precio: 700.00, stock: 9, especificaciones: { color: "Naranja", talla: "L", peso: "14.8 kg" } },
      { modelo: "Aspect 950", idMarca: scott._id, tipo: "Montana", precio: 800.00, stock: 5, especificaciones: { color: "Negro", talla: "M", peso: "13.2 kg" } },
      { modelo: "Via Nirone 7", idMarca: bianchi._id, tipo: "Ruta", precio: 1200.00, stock: 4, especificaciones: { color: "Celeste", talla: "S", peso: "9.1 kg" } },
      { modelo: "Marlin 7", idMarca: trek._id, tipo: "Montana", precio: 900.00, stock: 11, especificaciones: { color: "Azul", talla: "L", peso: "13.5 kg" } }
    ]);
    console.log(`${resultadoBicis.insertedCount} bicicletas insertadas`);

    // ============================================================
    // INSERTAR USUARIOS CON CREDENCIALES
    // ============================================================
    const resultadoUsuarios = await usuarios.insertMany([
      {
        nombre: "Juan Perez",
        email: "juan.perez@email.com",
        telefono: "8888-1111",
        direccion: "San Jose, Costa Rica",
        credenciales: { idUsuario: "jperez", clave: "123" }
      },
      {
        nombre: "Maria Lopez",
        email: "maria.lopez@email.com",
        telefono: "8888-2222",
        direccion: "Alajuela, Costa Rica",
        credenciales: { idUsuario: "mlopez", clave: "123" }
      },
      {
        nombre: "Carlos Rodriguez",
        email: "carlos.rdz@email.com",
        telefono: "8888-3333",
        direccion: "Cartago, Costa Rica",
        credenciales: { idUsuario: "crodriguez", clave: "123" }
      },
      {
        nombre: "Ana Jimenez",
        email: "ana.jimenez@email.com",
        telefono: "8888-4444",
        direccion: "Heredia, Costa Rica",
        credenciales: { idUsuario: "ajimenez", clave: "123" }
      },
      {
        nombre: "Luis Mora",
        email: "luis.mora@email.com",
        telefono: "8888-5555",
        direccion: "Liberia, Costa Rica",
        credenciales: { idUsuario: "lmora", clave: "123" }
      }
    ]);
    console.log(`${resultadoUsuarios.insertedCount} usuarios insertados`);

    // ============================================================
    // DATOS PARA VENTAS DESNORMALIZADAS
    // ============================================================
    const bicisData = [
      { modelo: "Marlin 5", tipo: "Montana", marca: "Trek", precio: 650, id: resultadoBicis.insertedIds[0] },
      { modelo: "Domane AL 2", tipo: "Ruta", marca: "Trek", precio: 850, id: resultadoBicis.insertedIds[1] },
      { modelo: "Allez Sport", tipo: "Ruta", marca: "Specialized", precio: 1000, id: resultadoBicis.insertedIds[2] },
      { modelo: "Rockhopper Comp", tipo: "Montana", marca: "Specialized", precio: 750, id: resultadoBicis.insertedIds[3] },
      { modelo: "Revel 1", tipo: "Montana", marca: "Giant", precio: 550, id: resultadoBicis.insertedIds[4] },
      { modelo: "Contend AR 3", tipo: "Ruta", marca: "Giant", precio: 900, id: resultadoBicis.insertedIds[5] },
      { modelo: "Trail 8", tipo: "Montana", marca: "Cannondale", precio: 700, id: resultadoBicis.insertedIds[6] },
      { modelo: "Aspect 950", tipo: "Montana", marca: "Scott", precio: 800, id: resultadoBicis.insertedIds[7] },
      { modelo: "Via Nirone 7", tipo: "Ruta", marca: "Bianchi", precio: 1200, id: resultadoBicis.insertedIds[8] },
      { modelo: "Marlin 7", tipo: "Montana", marca: "Trek", precio: 900, id: resultadoBicis.insertedIds[9] }
    ];

    const usuariosData = [
      { nombre: "Juan Perez", correo: "juan.perez@email.com", id: resultadoUsuarios.insertedIds[0] },
      { nombre: "Maria Lopez", correo: "maria.lopez@email.com", id: resultadoUsuarios.insertedIds[1] },
      { nombre: "Carlos Rodriguez", correo: "carlos.rdz@email.com", id: resultadoUsuarios.insertedIds[2] },
      { nombre: "Ana Jimenez", correo: "ana.jimenez@email.com", id: resultadoUsuarios.insertedIds[3] },
      { nombre: "Luis Mora", correo: "luis.mora@email.com", id: resultadoUsuarios.insertedIds[4] }
    ];

    function crearVenta(fecha, biciIndex, usuarioIndex, cantidad, metodoPago) {
      const bici = bicisData[biciIndex];
      const usuario = usuariosData[usuarioIndex];
      return {
        fecha: new Date(fecha),
        bicicleta: {
          id: bici.id,
          modelo: bici.modelo,
          tipo: bici.tipo,
          marca: bici.marca
        },
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          correo: usuario.correo
        },
        cantidad: cantidad,
        precioUnitario: bici.precio,
        total: bici.precio * cantidad,
        metodoPago: metodoPago
      };
    }

    // ============================================================
    // INSERTAR UNA VENTA INDIVIDUAL (insertOne)
    // ============================================================
    const ventaIndividual = await ventas.insertOne(crearVenta("2026-10-01", 0, 0, 2, "Tarjeta"));
    console.log(`Venta individual insertada: ${ventaIndividual.insertedId}`);

    // ============================================================
    // INSERTAR MAS VENTAS (insertMany)
    // ============================================================
    const resultadoVentas = await ventas.insertMany([
      crearVenta("2026-10-01", 1, 1, 1, "Efectivo"),
      crearVenta("2026-10-02", 2, 0, 3, "Tarjeta"),
      crearVenta("2026-10-03", 3, 2, 1, "Transferencia"),
      crearVenta("2026-10-03", 0, 3, 2, "Tarjeta"),
      crearVenta("2026-10-04", 4, 4, 1, "Efectivo"),
      crearVenta("2026-10-04", 5, 0, 1, "Tarjeta"),
      crearVenta("2026-10-05", 6, 1, 2, "Transferencia"),
      crearVenta("2026-10-05", 7, 2, 1, "Efectivo"),
      crearVenta("2026-10-06", 8, 3, 1, "Tarjeta"),
      crearVenta("2026-10-06", 9, 4, 2, "Tarjeta"),
      crearVenta("2026-10-07", 0, 1, 1, "Efectivo"),
      crearVenta("2026-10-07", 2, 4, 2, "Tarjeta")
    ]);
    console.log(`${resultadoVentas.insertedCount} ventas insertadas`);

    // ============================================================
    // ACTUALIZAR DATOS
    // ============================================================
    const updateStock = await bicicletas.updateOne(
      { modelo: "Marlin 5" },
      { $inc: { stock: -3 } }
    );
    console.log(`Stock actualizado: ${updateStock.modifiedCount} documento`);

    const updateUsuario = await usuarios.updateOne(
      { email: "juan.perez@email.com" },
      { $set: { telefono: "8999-0000", direccion: "Escazu, Costa Rica" } }
    );
    console.log(`Usuario actualizado: ${updateUsuario.modifiedCount} documento`);

    // ============================================================
    // ELIMINAR DATO
    // ============================================================
    const deleteVenta = await ventas.deleteOne({
      _id: resultadoVentas.insertedIds[10]
    });
    console.log(`Venta eliminada: ${deleteVenta.deletedCount} documento`);

    // ============================================================
    // CONSULTA 1: Cantidad vendida por fecha especifica
    // ============================================================
    console.log("\nCONSULTA 1: Cantidad vendida el 2026-10-03");
    const consulta1 = await ventas.aggregate([
      { $match: { fecha: new Date("2026-10-03") } },
      { $group: { _id: null, totalBicicletasVendidas: { $sum: "$cantidad" }, totalDinero: { $sum: "$total" } } }
    ]).toArray();
    console.log(consulta1);

    // ============================================================
    // CONSULTA 2: Marcas con al menos una venta (sin lookup)
    // ============================================================
    console.log("\nCONSULTA 2: Marcas con al menos una venta");
    const consulta2 = await ventas.aggregate([
      { $group: { _id: "$bicicleta.marca" } },
      { $project: { _id: 0, marca: "$_id" } },
      { $sort: { marca: 1 } }
    ]).toArray();
    console.log(consulta2);

    // ============================================================
    // CONSULTA 3: Bicicletas vendidas y stock restante
    // ============================================================
    console.log("\nCONSULTA 3: Bicicletas vendidas y stock restante");
    const consulta3 = await bicicletas.aggregate([
      {
        $lookup: {
          from: "ventas",
          localField: "_id",
          foreignField: "bicicleta.id",
          as: "ventasDeEstaBici"
        }
      },
      { $addFields: { totalVendido: { $sum: "$ventasDeEstaBici.cantidad" } } },
      { $match: { totalVendido: { $gt: 0 } } },
      { $project: { _id: 0, modelo: 1, tipo: 1, stock: 1, totalVendido: 1 } },
      { $sort: { totalVendido: -1 } }
    ]).toArray();
    console.log(consulta3);

    // ============================================================
    // CONSULTA 4: Top 5 marcas mas vendidas (sin lookup)
    // ============================================================
    console.log("\nCONSULTA 4: Top 5 marcas mas vendidas");
    const consulta4 = await ventas.aggregate([
      { $group: { _id: "$bicicleta.marca", totalBicicletasVendidas: { $sum: "$cantidad" }, totalDineroGenerado: { $sum: "$total" } } },
      { $sort: { totalBicicletasVendidas: -1 } },
      { $limit: 5 },
      { $project: { _id: 0, marca: "$_id", totalBicicletasVendidas: 1, totalDineroGenerado: 1 } }
    ]).toArray();
    console.log(consulta4);

    console.log("\nProyecto ejecutado correctamente");

  } catch (error) {
    console.error("Error en el programa:", error);
  } finally {
    await cliente.close();
    console.log("Conexion cerrada");
  }
}

main();