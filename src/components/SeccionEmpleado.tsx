import { NavLink, useLocation } from "react-router-dom";

export const SeccionEmpleado = () => {

    const location = useLocation();

    const { data } = location.state

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-6 mx-auto">
                    <div className="card">
                        <NavLink className='d-flex' to={'/dashboard'}>Volver a Inicio</NavLink>
                        <div className="d-flex justify-content-center card-header mt-2">
                            <h3 className="card-title">Perfil de Empleado</h3>
                            <img width="38" height="38" src="https://img.icons8.com/color/48/user.png" alt="user" />
                        </div>
                        <div className="card-body">
                            {data ? (
                                <div>
                                    <p><strong>Nombre de Empleado:</strong> {data.nombre}</p>
                                    <p><strong>Codigo Empleado:</strong> {data.codigoEmpleado}</p>
                                    <p><strong>Locker Asignado:</strong> {data.lockerAsignado}</p>
                                    <p><strong>Fecha de Entrada: </strong>{new Date(data.fechaCreacion).toLocaleDateString()}</p>

                                </div>
                            ) : (
                                <p>Empleado no encontrado</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}