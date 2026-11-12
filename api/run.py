from v1.app.index import create_app

print("⏳ Iniciando la aplicación...") 

app = create_app()

if __name__ == '__main__':
    print("🚀 Levantando el servidor en el puerto 5000...") 
    app.run(debug=True, port=5000)