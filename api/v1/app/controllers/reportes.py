from flask import Blueprint, jsonify

reportes_bp = Blueprint('reportes', __name__)

def init_reportes_controller(db):
    @reportes_bp.route('/reportes/marcas-con-ventas', methods=['GET'])
    def marcas_con_ventas():
        # Consulta para agrupar por la marca anidada en la venta
        pipeline = [
            { "$match": { "bicicleta.marca": { "$exists": True, "$ne": None } } },
            { "$group": { "_id": "$bicicleta.marca" } },
            { "$project": { "_id": 0, "marca": "$_id" } }
        ]
        res = list(db.ventas.aggregate(pipeline))
        return jsonify(res), 200

    @reportes_bp.route('/reportes/bicicletas-vendidas', methods=['GET'])
    def bicis_vendidas():
        pipeline = [
            { "$lookup": { "from": "ventas", "localField": "_id", "foreignField": "bicicleta.id", "as": "ventas" } },
            { "$addFields": { "totalVendido": { "$sum": "$ventas.cantidad" } } },
            { "$match": { "totalVendido": { "$gt": 0 } } },
            { "$project": { "_id": 0, "modelo": 1, "tipo": 1, "stock": 1, "totalVendido": 1 } }
        ]
        res = list(db.bicicletas.aggregate(pipeline))
        return jsonify(res), 200

    @reportes_bp.route('/reportes/top-5-marcas', methods=['GET'])
    def top_marcas():
        pipeline = [
            { "$match": { "bicicleta.marca": { "$exists": True, "$ne": None } } },
            { "$group": { "_id": "$bicicleta.marca", "totalVendidas": { "$sum": "$cantidad" }, "totalDinero": { "$sum": "$total" } } },
            { "$sort": { "totalVendidas": -1 } },
            { "$limit": 5 },
            { "$project": { "_id": 0, "marca": "$_id", "totalVendidas": 1, "totalDinero": 1 } }
        ]
        res = list(db.ventas.aggregate(pipeline))
        return jsonify(res), 200