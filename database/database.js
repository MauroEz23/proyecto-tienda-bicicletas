// ============================================================
// PROYECTO 1 - DESARROLLO CON PLATAFORMAS ABIERTAS
// Base de datos: Tienda de Bicicletas
// Autor: Mauro Rdoriguez, Yannela Castillo
// ============================================================

// Importar MongoClient y ObjectId de la librería mongodb
const { MongoClient, ObjectId } = require("mongodb");

// URL de conexión local 
const url = "mongodb://127.0.0.1:27017";

// Nombre de la base de datos
const nombreDB = "tienda_bicicletas";

// cliente de MongoDB
const cliente = new MongoClient(url);

// ============================================================
// FUNCIÓN PRINCIPAL
// ============================================================
async function main() {
  try {
    
    await cliente.connect();
    console.log("✅ Conectado a MongoDB correctamente");

    const db = cliente.db(nombreDB);

    const marcas = db.collection("marcas");
    const bicicletas = db.collection("bicicletas");
    const usuarios = db.collection("usuarios");
    const ventas = db.collection("ventas");

    console.log("📁 Colecciones listas");

    // --------------------------------------------------------
    // LIMPIAR COLECCIONES (para evitar duplicados)
    // --------------------------------------------------------
    await marcas.deleteMany({});
    await bicicletas.deleteMany({});
    await usuarios.deleteMany({});
    await ventas.deleteMany({});
    console.log("🧹 Colecciones limpias");

    // ============================================================
    // INSERTAR MARCAS
    // ============================================================
    const resultadoMarcas = await marcas.insertMany([
      {
        nombre: "Trek",
        paisOrigen: "Estados Unidos",
        añoFundacion: 1975,
        sitioWeb: "https://www.trekbikes.com"
      },
      {
        nombre: "Specialized",
        paisOrigen: "Estados Unidos",
        añoFundacion: 1974,
        sitioWeb: "https://www.specialized.com"
      },
      {
        nombre: "Giant",
        paisOrigen: "Taiwán",
        añoFundacion: 1972,
        sitioWeb: "https://www.giant-bicycles.com"
      },
      {
        nombre: "Cannondale",
        paisOrigen: "Estados Unidos",
        añoFundacion: 1971,
        sitioWeb: "https://www.cannondale.com"
      },
      {
        nombre: "Scott",
        paisOrigen: "Suiza",
        añoFundacion: 1958,
        sitioWeb: "https://www.scott-sports.com"
      },
      {
        nombre: "Bianchi",
        paisOrigen: "Italia",
        añoFundacion: 1885,
        sitioWeb: "https://www.bianchi.com"
      }
    ]);
    console.log(`✅ ${resultadoMarcas.insertedCount} marcas insertadas`);

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
      {
        modelo: "Marlin 5",
        idMarca: trek._id,
        tipo: "Montaña",
        precio: 650.0,
        stock: 12,
        especificaciones: { color: "Rojo", talla: "M", peso: "14.5 kg" }
      },
      {
        modelo: "Domane AL 2",
        idMarca: trek._id,
        tipo: "Ruta",
        precio: 850.0,
        stock: 8,
        especificaciones: { color: "Negro", talla: "L", peso: "10.2 kg" }
      },
      {
        modelo: "Allez Sport",
        idMarca: specialized._id,
        tipo: "Ruta",
        precio: 1000.0,
        stock: 6,
        especificaciones: { color: "Azul", talla: "S", peso: "9.8 kg" }
      },
      {
        modelo: "Rockhopper Comp",
        idMarca: specialized._id,
        tipo: "Montaña",
        precio: 750.0,
        stock: 10,
        especificaciones: { color: "Verde", talla: "M", peso: "13.9 kg" }
      },
      {
        modelo: "Revel 1",
        idMarca: giant._id,
        tipo: "Montaña",
        precio: 550.0,
        stock: 15,
        especificaciones: { color: "Gris", talla: "L", peso: "14.1 kg" }
      },
      {
        modelo: "Contend AR 3",
        idMarca: giant._id,
        tipo: "Ruta",
        precio: 900.0,
        stock: 7,
        especificaciones: { color: "Blanco", talla: "M", peso: "9.5 kg" }
      },
      {
        modelo: "Trail 8",
        idMarca: cannondale._id,
        tipo: "Montaña",
        precio: 700.0,
        stock: 9,
        especificaciones: { color: "Naranja", talla: "L", peso: "14.8 kg" }
      },
      {
        modelo: "Aspect 950",
        idMarca: scott._id,
        tipo: "Montaña",
        precio: 800.0,
        stock: 5,
        especificaciones: { color: "Negro", talla: "M", peso: "13.2 kg" }
      },
      {
        modelo: "Via Nirone 7",
        idMarca: bianchi._id,
        tipo: "Ruta",
        precio: 1200.0,
        stock: 4,
        especificaciones: { color: "Celeste", talla: "S", peso: "9.1 kg" }
      },
      {
        modelo: "Marlin 7",
        idMarca: trek._id,
        tipo: "Montaña",
        precio: 900.0,
        stock: 11,
        especificaciones: { color: "Azul", talla: "L", peso: "13.5 kg" }
      }
    ]);
    console.log(`✅ ${resultadoBicis.insertedCount} bicicletas insertadas`);

    // ============================================================
    // INSERTAR USUARIOS
    // ============================================================
    const resultadoUsuarios = await usuarios.insertMany([
      {
        nombre: "Juan Pérez",
        email: "juan.perez@email.com",
        telefono: "8888-1111",
        direccion: "San José, Costa Rica"
      },
      {
        nombre: "María López",
        email: "maria.lopez@email.com",
        telefono: "8888-2222",
        direccion: "Alajuela, Costa Rica"
      },
      {
        nombre: "Carlos Rodríguez",
        email: "carlos.rdz@email.com",
        telefono: "8888-3333",
        direccion: "Cartago, Costa Rica"
      },
      {
        nombre: "Ana Jiménez",
        email: "ana.jimenez@email.com",
        telefono: "8888-4444",
        direccion: "Heredia, Costa Rica"
      },
      {
        nombre: "Luis Mora",
        email: "luis.mora@email.com",
        telefono: "8888-5555",
        direccion: "Liberia, Costa Rica"
      }
    ]);
    console.log(`✅ ${resultadoUsuarios.insertedCount} usuarios insertados`);

    // ============================================================
    // INSERTAR UNA VENTA INDIVIDUAL (insertOne)
    // ============================================================
    const ventaIndividual = await ventas.insertOne({
      fecha: new Date("2026-10-01"),
      idBicicleta: resultadoBicis.insertedIds[0],  // Marlin 5
      idUsuario: resultadoUsuarios.insertedIds[0], // Juan Pérez
      cantidad: 2,
      precioUnitario: 650.0,
      total: 1300.0,
      metodoPago: "Tarjeta"
    });
    console.log(`✅ Venta individual insertada: ${ventaIndividual.insertedId}`);

    // ============================================================
    // INSERTAR VARIAS VENTAS (insertMany)
    // ============================================================
    const resultadoVentas = await ventas.insertMany([
      {
        fecha: new Date("2026-10-01"),
        idBicicleta: resultadoBicis.insertedIds[1],
        idUsuario: resultadoUsuarios.insertedIds[1],
        cantidad: 1,
        precioUnitario: 850.0,
        total: 850.0,
        metodoPago: "Efectivo"
      },
      {
        fecha: new Date("2026-10-02"),
        idBicicleta: resultadoBicis.insertedIds[2],
        idUsuario: resultadoUsuarios.insertedIds[0],
        cantidad: 3,
        precioUnitario: 1000.0,
        total: 3000.0,
        metodoPago: "Tarjeta"
      },
      {
        fecha: new Date("2026-10-03"),
        idBicicleta: resultadoBicis.insertedIds[3],
        idUsuario: resultadoUsuarios.insertedIds[2],
        cantidad: 1,
        precioUnitario: 750.0,
        total: 750.0,
        metodoPago: "Transferencia"
      },
      {
        fecha: new Date("2026-10-03"),
        idBicicleta: resultadoBicis.insertedIds[0],
        idUsuario: resultadoUsuarios.insertedIds[3],
        cantidad: 2,
        precioUnitario: 650.0,
        total: 1300.0,
        metodoPago: "Tarjeta"
      },
      {
        fecha: new Date("2026-10-04"),
        idBicicleta: resultadoBicis.insertedIds[4],
        idUsuario: resultadoUsuarios.insertedIds[4],
        cantidad: 1,
        precioUnitario: 550.0,
        total: 550.0,
        metodoPago: "Efectivo"
      },
      {
        fecha: new Date("2026-10-04"),
        idBicicleta: resultadoBicis.insertedIds[5],
        idUsuario: resultadoUsuarios.insertedIds[0],
        cantidad: 1,
        precioUnitario: 900.0,
        total: 900.0,
        metodoPago: "Tarjeta"
      },
      {
        fecha: new Date("2026-10-05"),
        idBicicleta: resultadoBicis.insertedIds[6],
        idUsuario: resultadoUsuarios.insertedIds[1],
        cantidad: 2,
        precioUnitario: 700.0,
        total: 1400.0,
        metodoPago: "Transferencia"
      },
      {
        fecha: new Date("2026-10-05"),
        idBicicleta: resultadoBicis.insertedIds[7],
        idUsuario: resultadoUsuarios.insertedIds[2],
        cantidad: 1,
        precioUnitario: 800.0,
        total: 800.0,
        metodoPago: "Efectivo"
      },
      {
        fecha: new Date("2026-10-06"),
        idBicicleta: resultadoBicis.insertedIds[8],
        idUsuario: resultadoUsuarios.insertedIds[3],
        cantidad: 1,
        precioUnitario: 1200.0,
        total: 1200.0,
        metodoPago: "Tarjeta"
      },
      {
        fecha: new Date("2026-10-06"),
        idBicicleta: resultadoBicis.insertedIds[9],
        idUsuario: resultadoUsuarios.insertedIds[4],
        cantidad: 2,
        precioUnitario: 900.0,
        total: 1800.0,
        metodoPago: "Tarjeta"
      },
      {
        fecha: new Date("2026-10-07"),
        idBicicleta: resultadoBicis.insertedIds[0],
        idUsuario: resultadoUsuarios.insertedIds[1],
        cantidad: 1,
        precioUnitario: 650.0,
        total: 650.0,
        metodoPago: "Efectivo"
      },
      {
        fecha: new Date("2026-10-07"),
        idBicicleta: resultadoBicis.insertedIds[2],
        idUsuario: resultadoUsuarios.insertedIds[4],
        cantidad: 2,
        precioUnitario: 1000.0,
        total: 2000.0,
        metodoPago: "Tarjeta"
      }
    ]);
    console.log(`✅ ${resultadoVentas.insertedCount} ventas insertadas`);

    // ============================================================
    // ACTUALIZAR DATOS (updateOne)
    // ============================================================
    // Actualizamos el stock de una bicicleta (restamos 3 unidades vendidas)
    const updateStock = await bicicletas.updateOne(
      { modelo: "Marlin 5" },
      { $inc: { stock: -3 } }
    );
    console.log(`✅ Stock actualizado: ${updateStock.modifiedCount} documento`);

    // Actualizamos los datos de un usuario
    const updateUsuario = await usuarios.updateOne(
      { email: "juan.perez@email.com" },
      { $set: { telefono: "8999-0000", direccion: "Escazú, Costa Rica" } }
    );
    console.log(`✅ Usuario actualizado: ${updateUsuario.modifiedCount} documento`);

    // ============================================================
    // ELIMINAR DATO (deleteOne)
    // ============================================================
    const deleteVenta = await ventas.deleteOne({
      _id: resultadoVentas.insertedIds[10]
    });
    console.log(`✅ Venta eliminada: ${deleteVenta.deletedCount} documento`);

    // ============================================================
    // CONSULTA 1
    // Obtener la cantidad vendida de bicicletas por fecha y
    // filtrarla con una fecha específica.
    // ============================================================
    console.log("\n📊 CONSULTA 1: Cantidad vendida el 2026-10-03");
    const consulta1 = await ventas.aggregate([
      // Filtramos solo las ventas de esa fecha exacta
      {
        $match: {
          fecha: new Date("2026-10-03")
        }
      },
      // Agrupamos y sumamos las cantidades y el dinero total
      {
        $group: {
          _id: null,
          totalBicicletasVendidas: { $sum: "$cantidad" },
          totalDinero: { $sum: "$total" }
        }
      }
    ]).toArray();
    console.log(consulta1);

    // ============================================================
    // CONSULTA 2
    // Obtener la lista de todas las marcas que tienen al menos
    // una venta.
    // ============================================================
    console.log("\n📊 CONSULTA 2: Marcas con al menos una venta");
    const consulta2 = await ventas.aggregate([
      // Unimos ventas con bicicletas
      {
        $lookup: {
          from: "bicicletas",
          localField: "idBicicleta",
          foreignField: "_id",
          as: "infoBicicleta"
        }
      },
      { $unwind: "$infoBicicleta" },
      // Unimos con marcas
      {
        $lookup: {
          from: "marcas",
          localField: "infoBicicleta.idMarca",
          foreignField: "_id",
          as: "infoMarca"
        }
      },
      { $unwind: "$infoMarca" },
      // Agrupamos por marca para que no se repita
      {
        $group: {
          _id: "$infoMarca.nombre",
          paisOrigen: { $first: "$infoMarca.paisOrigen" }
        }
      },
      // Proyectamos los campos finales
      {
        $project: {
          _id: 0,
          marca: "$_id",
          paisOrigen: 1
        }
      },
      { $sort: { marca: 1 } }
    ]).toArray();
    console.log(consulta2);

    // ============================================================
    // CONSULTA 3
    // Obtener bicicletas vendidas y su cantidad restante en stock.
    // ============================================================
    console.log("\n📊 CONSULTA 3: Bicicletas vendidas y stock restante");
    const consulta3 = await bicicletas.aggregate([
      // Unimos con ventas para saber cuánto se vendió de cada bici
      {
        $lookup: {
          from: "ventas",
          localField: "_id",
          foreignField: "idBicicleta",
          as: "ventasDeEstaBici"
        }
      },
      // Calculamos el total vendido por bici
      {
        $addFields: {
          totalVendido: { $sum: "$ventasDeEstaBici.cantidad" }
        }
      },
      // Solo mostramos las que tienen al menos 1 venta
      {
        $match: {
          totalVendido: { $gt: 0 }
        }
      },
      // Proyectamos los campos de interés
      {
        $project: {
          _id: 0,
          modelo: 1,
          tipo: 1,
          stock: 1,
          totalVendido: 1
        }
      },
      { $sort: { totalVendido: -1 } }
    ]).toArray();
    console.log(consulta3);

    // ============================================================
    // CONSULTA 4
    // Obtener listado de las 5 marcas más vendidas y su
    // cantidad de ventas.
    // ============================================================
    console.log("\n📊 CONSULTA 4: Top 5 marcas más vendidas");
    const consulta4 = await ventas.aggregate([
      // Unimos ventas con bicicletas
      {
        $lookup: {
          from: "bicicletas",
          localField: "idBicicleta",
          foreignField: "_id",
          as: "infoBicicleta"
        }
      },
      { $unwind: "$infoBicicleta" },
      // Unimos con marcas
      {
        $lookup: {
          from: "marcas",
          localField: "infoBicicleta.idMarca",
          foreignField: "_id",
          as: "infoMarca"
        }
      },
      { $unwind: "$infoMarca" },
      // Agrupamos por marca y sumamos cantidades
      {
        $group: {
          _id: "$infoMarca.nombre",
          totalBicicletasVendidas: { $sum: "$cantidad" },
          totalDineroGenerado: { $sum: "$total" }
        }
      },
      { $sort: { totalBicicletasVendidas: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: 0,
          marca: "$_id",
          totalBicicletasVendidas: 1,
          totalDineroGenerado: 1
        }
      }
    ]).toArray();
    console.log(consulta4);

    // ============================================================
    // FIN DEL PROGRAMA
    // ============================================================
    console.log("\n🎉 Proyecto ejecutado correctamente");

  } catch (error) {
    // Si algo falla, lo mostramos en consola
    console.error("❌ Error en el programa:", error);
  } finally {
    // Siempre cerramos la conexión
    await cliente.close();
    console.log("🔌 Conexión cerrada");
  }
}

// Ejecutamos la función principal
main();