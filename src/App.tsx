import './App.css'

function App() {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h2>Iniciar Sesión</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="usuario">Usuario</label>
                  <input type="text" className="form-control" id="usuario" placeholder="Ingresa tu usuario" required name="usuario" />
                </div>
                <div className="form-group">
                  <label htmlFor="contrasena">Contraseña</label>
                  <input type="password" className="form-control" id="contrasena" placeholder="Ingresa tu contraseña" required name="contrasena" />
                </div>
                <div className="form-group mt-4">
                  <button type="submit" className="btn btn-primary btn-block">Iniciar Sesión</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
