
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const RutaProtegida = () => {

    const { auth, cargando } = useAuth()

    if (cargando) return 'cargando.....'

    return (
        <>

            {auth._id ?
                (
                    <div className='bg-gray-400'>
                        <Header />
                        <div className='md:flex md:min-h-screen'>
                            <Sidebar />
                            <main className='flex-1 p-10'style={{background:"#f5f0f0"}}>
                                <Outlet/>
                            </main>
                        </div>
                    </div>
                ) : <Navigate to="/" />}
        </>
    )
}

export default RutaProtegida;