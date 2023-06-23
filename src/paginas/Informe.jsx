import { Link, useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

let socket;

const Proyecto = () => {
    const params = useParams()

    const { obtenerProyecto, proyecto, cargando, handleModalTarea,
        alerta, submitTareasProyecto, eliminarTareaProyecto, editarTareaProyecto, cambiarEstado } = useProyectos()
    const { TareasCompletas, setTareasCompletas } = useState(0)
    const admin = useAdmin()
    console.log("Informacino del proyecto", proyecto)
    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
        socket.emit("abrir proyecto", params.id)
    }, [])



    const { fechaEntrega, tareas, colaboradores } = proyecto
    console.log(tareas)
    /*   const cantidadColaboradores = colaboradores.filter(
          (dato) => dato.estado === true
      ).length; */
    const cantidadCompleta = tareas.filter(
        (dato) => dato.estado === true
    ).length;

    const cantidadIncompleta = tareas.filter(
        (dato) => dato.estado === false
    ).length;

    const fechaActual = new Date()

    const fechaBaseDatosObjeto = new Date(fechaEntrega);

    const diferenciaMilisegundos = fechaBaseDatosObjeto - fechaActual;

    // Convertimos la diferencia de milisegundos a días
    const diferenciaDias = Math.floor(
        diferenciaMilisegundos / (1000 * 60 * 60 * 24)
    );


    if (cargando) return (
        <div className="border border-blue-300 shadow rounded-md p-4  w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-200 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-200 rounded"></div>
                    </div>
                </div>
            </div> </div>)

    const { msg } = alerta

    const porTareasC = (((tareas.length) - (cantidadIncompleta)) / tareas.length) * 100
    const porTareasI = (((tareas.length) - (cantidadCompleta)) / tareas.length) * 100
    console.log(porTareasI)

    return (
        <>
            <div style={{ width: '100%', display: "flex", marginBottom: "50px", gap: "5%" }}>
                <div>
                    Colaboradores :
                    <p className="text-2l font-black">
                        {colaboradores.length}

                    </p>
                </div>

                <div>
                    Estado del Proyecto:
                    <p className="text-2l font-black">
                        {diferenciaDias > 0 ? "Proyecto con : " + (diferenciaDias) + " Dias para la entrega"
                            : "  Proyecto Atrazado, tiene : " + (diferenciaDias * -1) + " dias de atrazo"}
                    </p>
                </div>
                <div >
                    numero de tareas :
                    <p className="text-2l font-black">
                        {tareas.length}

                    </p>
                </div>
            </div>

            <div style={{ display: 'flex', gap: "50px" }}>


                <div style={{ width: '25%' }}>

                    <CircularProgressbar
                        value={porTareasC}
                        text={`${porTareasC}%`}
                         />
                    <div className="text-2l font-black" style={{ textAlign:"center",marginTop:"20px"}} >
                        Ejecucion del proyecto
                    </div>
                </div>

                <div style={{ width: '25%' }}>
                    <CircularProgressbar
                        styles={buildStyles({
                            pathColor: 'red',
                            textColor: 'black',
                            trailColor: 'blue'
                        })}
                        value={porTareasC}
                        text={`${porTareasC}%`}

                    />
                    <div className="text-2l font-black" style={{ textAlign:"center",marginTop:"20px"}}>
                        Tareas Completadas :{cantidadCompleta}
                    </div>



                </div>

                <div style={{ width: '25%' }}>
                    <CircularProgressbar
                        styles={buildStyles({
                            pathColor: 'red',
                            textColor: 'black',
                            trailColor: 'blue'
                        })}
                        value={porTareasI}
                        text={`${porTareasI}%`}
                    />
                    <div className="text-2l font-black" style={{ textAlign:"center",marginTop:"20px"}}>
                        Tareas Faltantes :{cantidadIncompleta}
                    </div>
                </div>



            </div>

        </>
    )
}
export default Proyecto