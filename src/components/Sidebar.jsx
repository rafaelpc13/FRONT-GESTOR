import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {

    const { auth } = useAuth()
  
    return (
        <aside className='md:w-70 lg:w-86 px-5 py-10'>
            <p className="text-xl font-bold"> Hola : {auth.primernombre +" "+ auth.primerapellido} </p>

            <Link to="/proyectos"
                className=" text-xl font-bold uppercase block mt-5 text-center text-sky-800">
                Proyectos
            </Link>


            <Link
                to="crear-proyecto"
                className='bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg'>
                Nuevo Proyecto
            </Link>

            {/*   <Link
                to="EnvioNequi"
                className='bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg'>
                Envio Nequi
            </Link> */}
        </aside>
    )
}

export default Sidebar;