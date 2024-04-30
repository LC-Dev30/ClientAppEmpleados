import { useEffect, useState } from "react"
import { getLockers } from "../requestClient/hook";

type props = {
  setData: React.Dispatch<React.SetStateAction<{ Nombre: string, LockerAsignado: number }>>;
  data: { Nombre: string, LockerAsignado: number }
}

export const ModalEmpleado = (props: props) => {

  const [listalockers, setListaLockers] = useState<{ id: number, numeroLocker: number, estado: number, bandejaPocision: number, calzadoPocision: number }[]>([])

  useEffect(() => {
    async function fetchData() {
      const lockers = await getLockers()
      console.log(lockers);
      setListaLockers(lockers)
    }
    fetchData()
  }, [])

  return (
    <div>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Asignar Locker
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Lista de lockers disponible</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <select onChange={(value) => props.setData({ ...props.data, LockerAsignado: parseInt(value.target.value) })} className="form-select" aria-label="Default select example">
                <option>{listalockers.length > 0 ? "Seleccionar Locker" : "No hay lockers disponibles"}</option>
                {listalockers.map((locker, i) => (
                  <option key={i} value={locker.numeroLocker}>{locker.numeroLocker}</option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}