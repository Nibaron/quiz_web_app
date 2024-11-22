import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {

    const { auth } = useAuth();
    const [role] = useState(auth?.user?.role);

    return (
        <>
            {
                (role === 'user' || role === 'admin') ? <Outlet /> : <Navigate to="/login" />
            }
        </>
    )
}

export default PrivateRoutes;