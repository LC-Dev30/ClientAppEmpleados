import { FormEvent, useState } from 'react'
import './App.css'
import { loginServicio } from './requestClient/hook'
import { TypeDataLogin } from './types/typesApp'
import Swal from 'sweetalert2'

function App() {

  const [nombre, setNombre] = useState('')
  const [contraseña, setContraseña] = useState('')


  async function login(e: FormEvent) {
    e.preventDefault()

    const data: TypeDataLogin = {
      Nombre: nombre.trim(),
      Contraseña: contraseña.trim()
    }
    const res = await loginServicio(data)

    if (res.status == 200) {
      localStorage.setItem('token', res.data)
      window.history.forward();
      window.location.href = '/dashboard'
      return;
    }

    Swal.fire({
      position: "top-end",
      icon: "error",
      title: res.detail,
      showConfirmButton: false,
      timer: 1900
    });
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h2>Iniciar Sesión</h2>
            </div>
            <div className="card-body">
              <form onSubmit={login}>
                <div className="form-group">
                  <label className='d-flex' htmlFor="usuario">Usuario</label>
                  <input onChange={(e) => setNombre(e.target.value)} type="text" className="form-control mt-2" id="usuario" required name="usuario" />
                </div>
                <div className="form-group">
                  <label className='d-flex' htmlFor="contrasena">Contraseña</label>
                  <input onChange={(e) => setContraseña(e.target.value)} type="password" className="form-control mt-2" id="contrasena" required name="contrasena" />
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
