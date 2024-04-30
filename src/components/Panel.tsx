import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { eliminarEmpleadoExistente, getEmpleados } from "../requestClient/hook";
import { eliminarEmpleadoType } from "../types/typesApp";

function Dashboard() {
    const [empleados, setEmpleados] = useState<{ codigoEmpleado: string, nombre: string, lockerAsignado: number, fechaCreacion: string }[]>([])

    useEffect(() => {
        async function fetchData() {
            const empleados = await getEmpleados()
            setEmpleados(empleados)
        }
        fetchData()
    }, [])
    const TableTh: string[] = ['Codigo Empleado', 'Nombre Completo', 'Locker Asignado', 'Fecha de entrada']

    async function eliminarEmpleado(codigoEmpleado: string, lockerAsignado:number) {
        const IsConfirm = confirm("Quieres eliminar este empleado?")

        if (IsConfirm) {

            const dataEmpleado:eliminarEmpleadoType = {
                CodigoEmpleado: parseInt(codigoEmpleado),
                LockerAsignado: lockerAsignado
            }
            await eliminarEmpleadoExistente(dataEmpleado)
        }
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <h2>Panel Administrativo</h2>
                <div className="d-flex gap-2 mt-3">
                    <NavLink to={'/dashboard/empleado'} className="btn btn-primary">Nuevo Empleado</NavLink>
                    <NavLink to={'/dashboard/lockers'} className="btn btn-secondary">Agregar lockers</NavLink>
                    <div className="d-flex gap-2">
                        <input type="text" className="form-control" placeholder="Codigo o Nombre" />
                        <button className="btn btn-secondary">Buscar</button>
                    </div>
                </div>
                <span className="d-flex mt-2">Empleados:<strong className="ml-2"> {empleados.length}</strong></span>
                <div className="col-md-12 d-flex justify-content-center mt-3">
                    <table className="table">
                        <thead>
                            <tr>
                                {TableTh.map((th,i) => (<th key={i}>{th}</th>))}
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empleados.map((empleado, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{empleado.codigoEmpleado}</td>
                                        <td>{empleado.nombre}</td>
                                        <td>{empleado.lockerAsignado}</td>
                                        <td>{new Date(empleado.fechaCreacion).toLocaleDateString()}</td>
                                        <td className="d-flex gap-2 justify-content-center">
                                            <Link to={`/dashboard/empleado/${empleado.codigoEmpleado}`} className="btn btn-primary">Editar</Link>
                                            <button onClick={() => eliminarEmpleado(empleado.codigoEmpleado,empleado.lockerAsignado)} className="btn btn-danger">Eliminar</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
