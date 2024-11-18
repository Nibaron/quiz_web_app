import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoutes = () => {

    const { auth } = useAuth();
    const [role] = useState(auth?.user?.role);

    return (
        <>
            {
                role === 'admin' ? <Outlet /> : <Navigate to="/unauthorized" />
            }
        </>
    )
}

export default AdminRoutes;