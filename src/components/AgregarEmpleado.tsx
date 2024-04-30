import { FormEvent, useState } from "react";
import { ModalEmpleado } from "./ModalEmpleado"
import { postEmpleado } from "../requestClient/hook";
import { postEmpleadoType } from "../types/typesApp";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

export const AgregarEmpleado = () => {

    const [data, setData] = useState<postEmpleadoType>({} as postEmpleadoType);

    async function guardarEmpleado(e: FormEvent) {
        e.preventDefault();

        const res = await postEmpleado(data)

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


    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-12 d-flex justify-content-center">
                    <div className="card col-md-5">
                        <NavLink className='d-flex' to={'/dashboard'}>Volver a Inicio</NavLink>
                        <div className="card-header bg-light mt-2">
                            <h3>Crear Empleado</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={(e) => guardarEmpleado(e)}>
                                <div className="form-group">
                                    <div className="d-flex">
                                        <label htmlFor="nombre">Nombre Completo</label>
                                    </div>
                                    <input type="text" onChange={(e) => setData({ ...data, Nombre: e.target.value.trim() })} className="form-control mt-1" id="nombre" name="nombre" required />
                                </div>
                                <div className="form-group mt-3 d-flex gap-3 justify-content-center">
                                    <ModalEmpleado setData={setData} data={data} />
                                    <button type="submit" className="btn btn-primary">Crear Empleado</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

