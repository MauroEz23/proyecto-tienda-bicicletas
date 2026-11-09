from flask import Blueprint, request, jsonify
from bson import ObjectId

bicicletas_bp = Blueprint('bicicletas', __name__)

def init_bicicletas_controller(bici_model):
    @bicicletas_bp.route('/bicicletas', methods=['GET'])
    def get_bicis():
        bicis = bici_model.obtener_todas()
        for b in bicis:
            b['id'] = str(b.pop('_id'))
            # Convertimos el idMarca a string para que sea serializable
            if 'idMarca' in b and b['idMarca'] is not None:
                b['idMarca'] = str(b['idMarca'])
        return jsonify(bicis), 200

    @bicicletas_bp.route('/bicicletas/<id>', methods=['GET'])
    def get_bici(id):
        bici = bici_model.obtener_por_id(id)
        if bici:
            bici['id'] = str(bici.pop('_id'))
            if 'idMarca' in bici and bici['idMarca'] is not None:
                bici['idMarca'] = str(bici['idMarca'])
            return jsonify(bici), 200
        return jsonify({"error": "Bicicleta no encontrada"}), 404

    @bicicletas_bp.route('/bicicletas', methods=['POST'])
    def create_bici():
        result = bici_model.crear(request.json)
        return jsonify({"id": str(result.inserted_id)}), 201

    @bicicletas_bp.route('/bicicletas/<id>', methods=['PUT'])
    def update_bici(id):
        result = bici_model.actualizar(id, request.json)
        return jsonify({"modificados": result.modified_count}), 200

    @bicicletas_bp.route('/bicicletas/<id>', methods=['DELETE'])
    def delete_bici(id):
        result = bici_model.eliminar(id)
        return jsonify({"eliminados": result.deleted_count}), 200