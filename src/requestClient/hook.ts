import axios from "axios"
import { editarEmpleadoType, eliminarEmpleadoType, postEmpleadoType } from "../types/typesApp"

export async function getLockers() {
    try {
        const res = await axios.get('https://localhost:7105/api/lockers')
        return res.data
    }
    catch (err) {
        console.log(err)
    }
}

export async function getEmpleados() {
    try {
        const res = await axios.get('https://localhost:7105/api/empleados')
        const data = res.data
        return data
    }
    catch (err) {
        console.log(err)
    }
}

export async function postEmpleado(dataEmpleado: postEmpleadoType) {
    try {
        const res = await axios.post('https://localhost:7105/api/empleado', dataEmpleado)
        return res.data
    } catch (err) {
        console.log(err);
    }
}

export async function EmpleadoPorCodigo(codigoEmpleado: number) {
    try {
        const res = await axios.get(`https://localhost:7105/api/empleado/${codigoEmpleado}`)
        const data = res.data
        console.log(data);
        return data
    }
    catch (err) {
        console.log(err)
    }
}

export async function editarEmpleadoExistente(dataEmpleado: editarEmpleadoType) {
    try {
        const res = await axios.put('https://localhost:7105/api/empleado', dataEmpleado)
        return res;
    } catch (err) {
        console.log(err);
    }
}

export async function eliminarEmpleadoExistente(dataEmpleado: eliminarEmpleadoType) {
    try {
        const res = await axios.delete(`https://localhost:7105/api/empleado/${dataEmpleado.CodigoEmpleado}/${dataEmpleado.LockerAsignado}`)
        return res;
    } catch (err) {
        console.log(err);
    }
}

export async function postLockers(numLocker:number) {
    try {
        const res = await axios.post(`https://localhost:7105/api/locker/${numLocker}`)
        return res.data
    }
    catch (err) {
        console.log(err)
    }
}


