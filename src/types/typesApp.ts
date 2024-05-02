export interface ProspObtenerLocker  {
    optenerNumLocker:(valor:string) => void
}

export type postEmpleadoType = {
    Nombre:string
    LockerAsignado: number
}

export type editarEmpleadoType = {
    Nombre: string
    LockerAsignado:number | string
    CodigoEmpleado:string | undefined
    NuevoLocker:number | string
}

export type eliminarEmpleadoType = {
    LockerAsignado:number | string
    CodigoEmpleado:number 
}

export type TypeDataLogin = {
    Nombre:string
    Contraseña:string
}

