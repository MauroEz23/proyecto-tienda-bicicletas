from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

# Importar modelos
from .models.marca import Marca
from .models.bicicleta import Bicicleta
from .models.usuario import Usuario
from .models.venta import Venta

# Importar controladores
from .controllers.marcas import marcas_bp, init_marcas_controller
from .controllers.bicicletas import bicicletas_bp, init_bicicletas_controller
from .controllers.usuarios import usuarios_bp, init_usuarios_controller
from .controllers.ventas import ventas_bp, init_ventas_controller
from .controllers.reportes import reportes_bp, init_reportes_controller

def create_app():
    app = Flask(__name__)
    app.json.ensure_ascii = False
    CORS(app)

    # Conexion a MongoDB
    client = MongoClient("mongodb://127.0.0.1:27017")
    db = client.tienda_bicicletas

    # Inicializar modelos
    marca_model = Marca(db)
    bici_model = Bicicleta(db)
    user_model = Usuario(db)
    venta_model = Venta(db)

    # Inicializar controladores
    init_marcas_controller(marca_model)
    init_bicicletas_controller(bici_model)
    init_usuarios_controller(user_model)
    init_ventas_controller(venta_model)
    init_reportes_controller(db)

    # Middleware de Seguridad (Bearer Token)
    @app.before_request
    def verificar_token():
        if request.path == '/':
            return
        
        token = request.headers.get("Authorization")
        if not token or token != "Bearer token-secreto-123":
            return jsonify({"error": "No autorizado. Token invalido o ausente."}), 401

    # Registrar Blueprints (Endpoints)
    app.register_blueprint(marcas_bp, url_prefix='/api/v1')
    app.register_blueprint(bicicletas_bp, url_prefix='/api/v1')
    app.register_blueprint(usuarios_bp, url_prefix='/api/v1')
    app.register_blueprint(ventas_bp, url_prefix='/api/v1')
    app.register_blueprint(reportes_bp, url_prefix='/api/v1')

    @app.route('/')
    def home():
        return jsonify({"mensaje": "API Tienda de Bicicletas funcionando"}), 200

    return app