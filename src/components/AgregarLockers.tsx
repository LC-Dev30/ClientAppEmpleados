import { FormEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getLockers, postLockers } from "../requestClient/hook";
import Swal from "sweetalert2";

export const AgregarLockers = () => {

    const [listalockers, setListaLockers] = useState<{ id: number, numeroLocker: number, estado: number, bandejaPocision: number, calzadoPocision: number }[]>([])
    const [cantidadLocker,setCantidadLockers] = useState(0)
    const router = useNavigate()

    useEffect(() => {
        async function fetchData() {
            const lockers = await getLockers()
            setListaLockers(lockers)
        }
        fetchData()
    }, [])

    async function agregarLockersServicio(e:FormEvent){
      e.preventDefault()
      const res = await postLockers(cantidadLocker)

      if (res?.status != 200 && res != undefined) {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
        });
    }

    Swal.fire({
        position: "top-end",
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500
    });
    }

    function cancelarEdicion(){

    }

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-4">
                <NavLink className='d-flex' to={'/dashboard'}>Volver a Inicio</NavLink>
                    <h2 className="mt-4 bg-light">Agregar nuevos Lockers</h2>
                            <span className="d-flex">Cantidad disponibles: <strong>{listalockers.length}</strong></span>
                    <form onSubmit={(e) => agregarLockersServicio(e)}>
                        <div className="form-group mt-3">
                            <label className="d-flex" htmlFor="codigoEmpleado">Cantidad de Lockers</label>
                            <input onChange={(v) => setCantidadLockers(parseInt(v.target.value))} min={1} max={100} type="number" className="form-control mt-2" id="codigoEmpleado" />
                        </div>
                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary mt-3">Agregar</button>
                            <button onClick={cancelarEdicion} type="button" className="btn btn-secondary mt-3">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}