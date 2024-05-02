import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { eliminarEmpleadoExistente, empleadoPorCodigoOrNombre, getEmpleados } from "../requestClient/hook";
import { eliminarEmpleadoType } from "../types/typesApp";
import Swal from "sweetalert2";


export const Panel = () => {
    const [empleados, setEmpleados] = useState<{ codigoEmpleado: string, nombre: string, lockerAsignado: number, fechaCreacion: string }[]>([])
    const [codigoOrNombre, setCodigoOrNombre] = useState('')

    const router = useNavigate()

    useEffect(() => {
        async function fetchData() {
            const empleados = await getEmpleados()
            setEmpleados(empleados)
        }
        fetchData()
    }, [])

    const TableTh: string[] = ['Codigo Empleado', 'Nombre Completo', 'Locker Asignado', 'Fecha de Entrada']

    async function eliminarEmpleado(codigoEmpleado: string, lockerAsignado: number) {
        const IsConfirm = confirm("Quieres eliminar este empleado?")

        if (IsConfirm) {

            const dataEmpleado: eliminarEmpleadoType = {
                CodigoEmpleado: parseInt(codigoEmpleado),
                LockerAsignado: lockerAsignado
            }
            await eliminarEmpleadoExistente(dataEmpleado)
        }
    }

    async function buscarEmpleadoPorNombreOrCodigo() {
        if (codigoOrNombre.length == 0) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: 'Introduce un codigo o nombre de empleado',
                showConfirmButton: false,
                timer: 1900
            });
            return
        }

        const res = await empleadoPorCodigoOrNombre(codigoOrNombre.trim())
        router(`/dashboard/empleado/seccion/${codigoOrNombre}`, { state: { data: res?.data } })
    }

    function cerrarSeccion() {
        localStorage.setItem('token', '')
        window.location.href = '/'
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <h2>Panel Administrativo</h2>
                <div className="d-flex justify-content-between gap-2 mt-3 ">
                    <div className="d-flex gap-2">
                        <NavLink to={'/dashboard/empleado'} className="btn btn-primary">Nuevo Empleado</NavLink>
                        <NavLink to={'/dashboard/lockers'} className="btn btn-secondary">Agregar lockers</NavLink>
                        <div className="d-flex gap-2">
                            <input onChange={(e) => setCodigoOrNombre(e.target.value)} type="text" className="form-control" placeholder="Codigo o Nombre" />
                            <button onClick={buscarEmpleadoPorNombreOrCodigo} className="btn btn-secondary">Buscar</button>
                        </div>
                    </div>
                    <div>
                        <button onClick={cerrarSeccion} className="btn btn-outline-danger">Cerrar Seccion</button>
                    </div>
                </div>
                <span className="d-flex mt-2 gap-1">
                    <img width="28" height="28" src="https://img.icons8.com/color/48/user.png" alt="user" />
                    Empleados:  
                    <strong className="ml-2"> {empleados.length}</strong>
                </span>
                <div className="col-md-12 d-flex justify-content-center mt-3">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                {TableTh.map((th, i) => (<th key={i}>{th}</th>))}
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empleados.length === 0 ? (
                                <tr>
                                    <td className="text-center">No hay empleados disponibles</td>
                                </tr>
                            ) : (
                                empleados.map((empleado, i) => (
                                    <tr key={i}>
                                        <td>{empleado.codigoEmpleado}</td>
                                        <td>{empleado.nombre.toUpperCase()}</td>
                                        <td>{empleado.lockerAsignado}</td>
                                        <td>{new Date(empleado.fechaCreacion).toLocaleDateString()}</td>
                                        <td className="d-flex gap-2 justify-content-center">
                                            <Link title="Editar empleado" to={`/dashboard/empleado/${empleado.codigoEmpleado}`} className="btn btn-outline-primary">
                                                <img width="18" height="18" src="https://img.icons8.com/ios/50/edit--v1.png" alt="edit--v1" />
                                            </Link>
                                            <button title="Eliminar empleado" onClick={() => eliminarEmpleado(empleado.codigoEmpleado, empleado.lockerAsignado)} className="btn btn-outline-danger">
                                                <img width="18" height="18" src="https://img.icons8.com/color/48/delete-sign--v1.png" alt="delete-sign--v1" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}


