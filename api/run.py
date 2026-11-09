from v1.app.index import create_app

print("⏳ Iniciando la aplicación...") # <--- Agregamos este print para depurar

app = create_app()

if __name__ == '__main__':
    print("🚀 Levantando el servidor en el puerto 5000...") # <--- Y este otro
    app.run(debug=True, port=5000)