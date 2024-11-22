import { useState, useEffect } from "react";
import { AuthContext } from "../context";

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        // Initialize state from local storage
        const savedAuth = localStorage.getItem("auth");
        return savedAuth ? JSON.parse(savedAuth) : {};
    });

    useEffect(() => {
        // Store auth data in local storage whenever it changes
        localStorage.setItem("auth", JSON.stringify(auth));
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
