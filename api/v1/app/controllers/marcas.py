from flask import Blueprint, request, jsonify
from bson import ObjectId

marcas_bp = Blueprint('marcas', __name__)

def init_marcas_controller(marca_model):
    @marcas_bp.route('/marcas', methods=['GET'])
    def get_marcas():
        marcas = marca_model.obtener_todas()
        for m in marcas: 
            m['id'] = str(m.pop('_id'))
        return jsonify(marcas), 200

    @marcas_bp.route('/marcas/<id>', methods=['GET'])
    def get_marca(id):
        marca = marca_model.obtener_por_id(id)
        if marca:
            marca['id'] = str(marca.pop('_id'))
            return jsonify(marca), 200
        return jsonify({"error": "Marca no encontrada"}), 404

    @marcas_bp.route('/marcas', methods=['POST'])
    def create_marca():
        datos = request.json
        result = marca_model.crear(datos)
        return jsonify({"id": str(result.inserted_id)}), 201

    @marcas_bp.route('/marcas/<id>', methods=['PUT'])
    def update_marca(id):
        result = marca_model.actualizar(id, request.json)
        return jsonify({"modificados": result.modified_count}), 200

    @marcas_bp.route('/marcas/<id>', methods=['DELETE'])
    def delete_marca(id):
        result = marca_model.eliminar(id)
        return jsonify({"eliminados": result.deleted_count}), 200