import { useState, useEffect } from "react";
import { AuthContext } from "../context";

const AuthProvider = ({ children }) => {
    // Initialize state from local storage
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")) || {});

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
