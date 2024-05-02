import { FormEvent, useEffect, useRef, useState } from "react"
import { empleadoPorCodigoOrNombre, editarEmpleadoExistente, getLockers } from "../requestClient/hook";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { editarEmpleadoType } from "../types/typesApp";
import Swal from "sweetalert2";

export const EditarEmpleado = () => {

    const [data, setData] = useState<{ CodigoEmpleado: string, nombre: string, lockerAsignado: number }>({ CodigoEmpleado: "", nombre: "", lockerAsignado: 0 });
    const [numLocker, setNumLocker] = useState('')

    const [listalockers, setListaLockers] = useState<{ id: number, numeroLocker: number, estado: number, bandejaPocision: number, calzadoPocision: number }[]>([])
    const { codigoEmpleado } = useParams();
    const nombreRef = useRef<HTMLInputElement>(null)

    const router = useNavigate()

    useEffect(() => {
        async function fetchData() {
            const lockers = await getLockers()

            if (codigoEmpleado != null && nombreRef.current != undefined) {
                const empleado = await empleadoPorCodigoOrNombre(codigoEmpleado);
                setData(empleado?.data)
                nombreRef.current.value = empleado?.data.nombre
            }

            setListaLockers(lockers)
        }
        fetchData()
    }, [codigoEmpleado])

    async function editarEmpleado(e: FormEvent) {
        e.preventDefault()

        const dataEmpleado:editarEmpleadoType = {
            Nombre: nombreRef.current?.value.trim() || data.nombre.trim(),
            CodigoEmpleado: codigoEmpleado,
            LockerAsignado: data.lockerAsignado,
            NuevoLocker: numLocker || 0,
        }

        const res = await editarEmpleadoExistente(dataEmpleado)

        if(res?.status != 200 && res != undefined){
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
            title: res?.data.message,
            showConfirmButton: false,
            timer: 1500
          });
    }

    function cancelarEdicion() {
        const IsCancel = confirm('Desea cancelar la edicion?')

        if (IsCancel)
            router('/dashboard')
    }

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-4">
                <NavLink className='d-flex' to={'/dashboard'}>Volver a Inicio</NavLink>
                    <h2 className="mt-4">Empleado</h2>
                    <form onSubmit={(e) => editarEmpleado(e)}>
                        <div className="form-group">
                            <label htmlFor="codigoEmpleado">Código Empleado</label>
                            <input type="text" className="form-control" id="codigoEmpleado" value={codigoEmpleado} readOnly />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="nombre">Nombre</label>
                            <input ref={nombreRef} type="text" className="form-control" id="nombre" />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="lockerAsignado">Locker Asignado: {data.lockerAsignado}</label>
                            <select onChange={(value) => setNumLocker(value.target.value)} className="form-control" id="lockerAsignado">
                                <option>{listalockers.length > 0 ? "Seleccionar Locker" : "No hay lockers disponibles"}</option>
                                {listalockers.map((locker, i) => (
                                    <option key={i} value={locker.numeroLocker}>{locker.numeroLocker}</option>
                                ))}
                            </select>
                        </div>
                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary mt-3">Guardar Edicion</button>
                            <button onClick={cancelarEdicion} type="button" className="btn btn-secondary mt-3">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}