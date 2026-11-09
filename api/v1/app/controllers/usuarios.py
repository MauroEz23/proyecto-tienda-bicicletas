from flask import Blueprint, request, jsonify

usuarios_bp = Blueprint('usuarios', __name__)

def init_usuarios_controller(user_model):
    @usuarios_bp.route('/usuarios', methods=['GET'])
    def get_users():
        users = user_model.obtener_todos()
        for u in users: 
            u['id'] = str(u.pop('_id'))
        return jsonify(users), 200

    @usuarios_bp.route('/usuarios/<id>', methods=['GET'])
    def get_user(id):
        user = user_model.obtener_por_id(id)
        if user:
            user['id'] = str(user.pop('_id'))
            return jsonify(user), 200
        return jsonify({"error": "Usuario no encontrado"}), 404

    @usuarios_bp.route('/usuarios', methods=['POST'])
    def create_user():
        result = user_model.crear(request.json)
        return jsonify({"id": str(result.inserted_id)}), 201

    @usuarios_bp.route('/usuarios/<id>', methods=['PUT'])
    def update_user(id):
        result = user_model.actualizar(id, request.json)
        return jsonify({"modificados": result.modified_count}), 200

    @usuarios_bp.route('/usuarios/<id>', methods=['DELETE'])
    def delete_user(id):
        result = user_model.eliminar(id)
        return jsonify({"eliminados": result.deleted_count}), 200