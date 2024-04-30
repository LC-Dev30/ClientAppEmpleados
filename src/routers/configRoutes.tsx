import {createBrowserRouter} from 'react-router-dom';
import Dashboard from '../components/Panel';
import App from '../App';
import { AgregarEmpleado } from '../components/AgregarEmpleado';
import { EditarEmpleado } from '../components/EditarEmpleado';
import { AgregarLockers } from '../components/AgregarLockers';

export const router = createBrowserRouter([
    {
      path:'/',
      element:<App/>
    },
    {
        path:'/dashboard',
        element:<Dashboard/>
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
])