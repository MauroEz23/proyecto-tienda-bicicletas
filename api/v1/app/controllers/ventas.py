from flask import Blueprint, request, jsonify
from bson import ObjectId

ventas_bp = Blueprint('ventas', __name__)

# Funcion auxiliar para convertir ObjectIds a string de forma segura
def limpiar_objectids(documento):
    if isinstance(documento, dict):
        for key, value in documento.items():
            if isinstance(value, ObjectId):
                documento[key] = str(value)
            elif isinstance(value, (dict, list)):
                limpiar_objectids(value)
    elif isinstance(documento, list):
        for item in documento:
            limpiar_objectids(item)
    return documento

def init_ventas_controller(venta_model):
    @ventas_bp.route('/ventas', methods=['GET'])
    def get_ventas():
        ventas = venta_model.obtener_todas()
        for v in ventas:
            v['id'] = str(v.pop('_id')) # Convertimos el _id principal
            limpiar_objectids(v)        # Convertimos cualquier ObjectId anidado (como idBicicleta o bicicleta.id)
        return jsonify(ventas), 200

    @ventas_bp.route('/ventas/<id>', methods=['GET'])
    def get_venta(id):
        venta = venta_model.obtener_por_id(id)
        if venta:
            venta['id'] = str(venta.pop('_id'))
            limpiar_objectids(venta)
            return jsonify(venta), 200
        return jsonify({"error": "Venta no encontrada"}), 404

    @ventas_bp.route('/ventas', methods=['POST'])
    def create_venta():
        result = venta_model.crear(request.json)
        return jsonify({"id": str(result.inserted_id)}), 201

    @ventas_bp.route('/ventas/<id>', methods=['PUT'])
    def update_venta(id):
        result = venta_model.actualizar(id, request.json)
        return jsonify({"modificados": result.modified_count}), 200

    @ventas_bp.route('/ventas/<id>', methods=['DELETE'])
    def delete_venta(id):
        result = venta_model.eliminar(id)
        return jsonify({"eliminados": result.deleted_count}), 200