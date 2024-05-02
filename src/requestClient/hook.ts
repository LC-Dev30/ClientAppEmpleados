import axios from "axios"
import { TypeDataLogin, editarEmpleadoType, eliminarEmpleadoType, postEmpleadoType } from "../types/typesApp"

const configAxios = axios.create({
    baseURL: 'https://localhost:7105'
})

configAxios.interceptors.request.use((config) => {

    if(config.url == '/api/login'){
        return config;
    }
    
    const token = localStorage.getItem('token')

    if(token)
        config.headers.Authorization = `Bearer ${token}`

    return config;
})

configAxios.interceptors.response.use((response) => {
    return response
},(err) => {

    if(err.response.status == 401)
        window.location.href = '/';
    
    return Promise.reject(err);
})

export async function getLockers() {
    try {
        const res = await configAxios.get('/api/lockers')
        return res.data
    }
    catch (err) {
        console.log(err)
    }
}

export async function getEmpleados() {
    try {
        const res = await configAxios.get('/api/empleados')
        const data = res.data
        return data
    }
    catch (err) {
        console.log(err)
    }
}

export async function postEmpleado(dataEmpleado: postEmpleadoType) {
    try {
        const res = await configAxios.post('/api/empleado', dataEmpleado)
        return res
    } catch (err) {
        console.log(err);
    }
}

export async function empleadoPorCodigoOrNombre(codigoOrNombreEmpleado: string) {
    try {
        const res = await configAxios.get(`/api/empleado/${codigoOrNombreEmpleado}`)
        return res
    }
    catch (err) {
        console.log(err)
    }
}

export async function editarEmpleadoExistente(dataEmpleado: editarEmpleadoType) {
    try {
        const res = await configAxios.put('/api/empleado', dataEmpleado)
        return res;
    } catch (err) {
        console.log(err);
    }
}

export async function eliminarEmpleadoExistente(dataEmpleado: eliminarEmpleadoType) {
    try {
        const res = await configAxios.delete(`/api/empleado/${dataEmpleado.CodigoEmpleado}/${dataEmpleado.LockerAsignado}`)
        return res;
    } catch (err) {
        console.log(err);
    }
}

export async function postLockers(numLocker:number) {
    try {
        const res = await configAxios.post(`/api/locker/${numLocker}`)
        return res
    }
    catch (err) {
        console.log(err)
    }
}

export async function loginServicio(dataLogin: TypeDataLogin) {
    try {
        const res = await configAxios.post('/api/login',dataLogin);

        if(res.status == 404)
            return null

        return res
    }
    catch (err:any) {
        return err.response.data
    }
}



