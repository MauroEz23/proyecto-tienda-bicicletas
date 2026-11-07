# 🚲 Proyecto 1: Tienda de Bicicletas (MongoDB)

**Universidad Florencio del Castillo**  
**Ingeniería Informática**  
**Curso:** Desarrollo con Plataformas Abiertas  
**Docente:** Daniel Bogarin Granados  
**III Cuatrimestre, 2026**

---

## 📋 Descripción del Proyecto

Este proyecto consiste en el diseño e implementación de una base de datos NoSQL (MongoDB) para una **tienda de bicicletas**. Se aplican operaciones CRUD (crear, leer, actualizar, eliminar) y consultas avanzadas usando el Aggregation Framework de MongoDB.

El modelo de datos está preparado para futuras integraciones con un front-end y una REST API, incluyendo credenciales de usuario y datos desnormalizados en ventas para optimizar consultas y evitar joins innecesarios.

---

## 🛠️ Tecnologías Utilizadas

- **MongoDB** (base de datos NoSQL)
- **Node.js** (entorno de ejecución)
- **GitHub** (control de versiones)
- **Markdown** (documentación)

---

## 📁 Estructura del Repositorio
/proyecto-tienda-bicicletas
│
├── /database
│ └── database.js # Script principal con todas las operaciones
│
├── /docs
│ └── ejemplos-json.md # Ejemplos JSON de cada colección
│
├── .gitignore # Excluye node_modules
├── package.json # Dependencias del proyecto
└── README.md # Este archivo

text

---

## 🗄️ Colecciones de la Base de Datos

La base de datos se llama `tienda_bicicletas` y contiene **4 colecciones**:

| Colección    | Descripción                                          |
|--------------|------------------------------------------------------|
| `marcas`     | Marcas de bicicletas (Trek, Giant, etc.)             |
| `bicicletas` | Catálogo de bicicletas con stock y precio            |
| `usuarios`   | Clientes registrados con credenciales de acceso      |
| `ventas`     | Registro de ventas con datos anidados (optimizado)   |

### Relaciones entre colecciones
ventas.bicicleta.id → bicicletas._id
ventas.usuario.id → usuarios._id
bicicletas.idMarca → marcas._id

text

**Nota:** En `ventas` se guardan datos anidados (modelo, tipo, marca, nombre y correo del usuario) para evitar `$lookup` en las consultas de reportes.

---

## 📄 Ejemplos de Documentos JSON

### 📌 Ejemplo de la colección `marcas`

```json
{
  "_id": "ObjectId('671f8a1b2c3d4e5f6a7b8c9d')",
  "nombre": "Trek",
  "paisOrigen": "Estados Unidos",
  "añoFundacion": 1975,
  "sitioWeb": "https://www.trekbikes.com"
}
📌 Ejemplo de la colección bicicletas
json
{
  "_id": "ObjectId('671f8a1b2c3d4e5f6a7b8c9e')",
  "modelo": "Marlin 5",
  "idMarca": "ObjectId('671f8a1b2c3d4e5f6a7b8c9d')",
  "tipo": "Montaña",
  "precio": 650.0,
  "stock": 12,
  "especificaciones": {
    "color": "Rojo",
    "talla": "M",
    "peso": "14.5 kg"
  }
}
📌 Ejemplo de la colección usuarios
json
{
  "_id": "ObjectId('671f8a1b2c3d4e5f6a7b8ca0')",
  "nombre": "Carlos Rodríguez",
  "email": "carlos.rdz@email.com",
  "telefono": "8888-3333",
  "direccion": "Cartago, Costa Rica",
  "credenciales": {
    "idUsuario": "crodriguez",
    "clave": "123"
  }
}
📌 Ejemplo de la colección ventas
json
{
  "_id": "ObjectId('671f8a1b2c3d4e5f6a7b8ca1')",
  "fecha": "2026-10-01T00:00:00.000Z",
  "bicicleta": {
    "id": "ObjectId('671f8a1b2c3d4e5f6a7b8c9e')",
    "modelo": "Marlin 5",
    "tipo": "Montaña",
    "marca": "Trek"
  },
  "usuario": {
    "id": "ObjectId('671f8a1b2c3d4e5f6a7b8ca0')",
    "nombre": "Carlos Rodríguez",
    "correo": "carlos.rdz@email.com"
  },
  "cantidad": 2,
  "precioUnitario": 650.0,
  "total": 1300.0,
  "metodoPago": "Tarjeta"
}