# Ejemplos de Documentos JSON por Colección

## Colección: `marcas`

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

