from bson import ObjectId

class Marca:
    def __init__(self, db):
        self.collection = db.marcas

    def obtener_todas(self):
        return list(self.collection.find())

    def obtener_por_id(self, id):
        return self.collection.find_one({"_id": ObjectId(id)})

    def crear(self, datos):
        return self.collection.insert_one(datos)

    def actualizar(self, id, datos):
        return self.collection.update_one({"_id": ObjectId(id)}, {"$set": datos})

    def eliminar(self, id):
        return self.collection.delete_one({"_id": ObjectId(id)})