import {createBrowserRouter} from 'react-router-dom';
import {Panel} from '../components/Panel';
import App from '../App';
import { AgregarEmpleado } from '../components/AgregarEmpleado';
import { EditarEmpleado } from '../components/EditarEmpleado';
import { AgregarLockers } from '../components/AgregarLockers';
import { SeccionEmpleado } from '../components/SeccionEmpleado';

export const router = createBrowserRouter([
    {
      path:'/',
      element:<App/>
    },
    {
        path:'/dashboard',
        element:<Panel/>
    },
    {
        path:'/dashboard/empleado',
        element:<AgregarEmpleado/>
    },
    {
        path:'/dashboard/lockers',
        element:<AgregarLockers/>
    },
    {
        path:'/dashboard/empleado/:codigoEmpleado',
        element:<EditarEmpleado/>
    },
    {
        path:'/dashboard/empleado/seccion/:codigoOrNombre',
        element:<SeccionEmpleado/>
    },
])