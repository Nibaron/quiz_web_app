import { useAuth } from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {

    const { auth } = useAuth();

    return (
        <>
            {
                auth?.authToken ? (
                    <>
                        <main className="bg-[#F5F3FF] min-h-screen">
                            <div className="container mx-auto py-3">
                                <Outlet />
                            </div>
                        </main>
                    </>
                ) : (
                    <Navigate to="/login" />
                )
            }
        </>
    )
}

export default PrivateRoutes;