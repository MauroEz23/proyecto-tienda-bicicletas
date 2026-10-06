``markdown

# 🚲 Proyecto 1: Tienda de Bicicletas

**Universidad Florencio del Castillo**  
**Ingeniería Informática**  
**Curso:** Desarrollo con Plataformas Abiertas  
**Docente:** Daniel Bogarin Granados  
**III Cuatrimestre, 2026**

---

## 📋 Descripción del Proyecto

Base de datos NoSQL (MongoDB) para una tienda de bicicletas. Incluye operaciones CRUD y consultas avanzadas con Aggregation Framework. Simula el backend de un punto de venta que podría integrarse con una REST API.

## 🛠️ Tecnologías Utilizadas

- MongoDB (base de datos NoSQL)
- Node.js (entorno de ejecución)
- GitHub (control de versiones)
- Markdown (documentación)

## 📁 Estructura del Repositorio


## 🗄️ Colecciones de la Base de Datos

| Colección | Descripción |
|-----------|-------------|
| `marcas` | Marcas de bicicletas (Trek, Giant, etc.) |
| `bicicletas` | Catálogo con stock y precio |
| `usuarios` | Clientes registrados |
| `ventas` | Registro de ventas realizadas |

## 📄 Ejemplos de Documentos JSON

### Colección: `marcas`

```json
{
  "_id": "ObjectId('671f8a1b2c3d4e5f6a7b8c9d')",
  "nombre": "Trek",
  "paisOrigen": "Estados Unidos",
  "añoFundacion": 1975,
  "sitioWeb": "https://www.trekbikes.com"
}

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

{
  "_id": "ObjectId('671f8a1b2c3d4e5f6a7b8ca0')",
  "nombre": "Juan Pérez",
  "email": "juan.perez@email.com",
  "telefono": "8888-1111",
  "direccion": "San José, Costa Rica"
}

{
  "_id": "ObjectId('671f8a1b2c3d4e5f6a7b8ca1')",
  "fecha": "2026-10-01T00:00:00.000Z",
  "idBicicleta": "ObjectId('671f8a1b2c3d4e5f6a7b8c9e')",
  "idUsuario": "ObjectId('671f8a1b2c3d4e5f6a7b8ca0')",
  "cantidad": 2,
  "precioUnitario": 650.0,
  "total": 1300.0,
  "metodoPago": "Tarjeta"
}