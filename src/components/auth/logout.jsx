
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { MenuIcon } from "../../assets/icons";

const Logout = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const handleLogout = () => {
        setAuth({});
        navigate("/login");
    }

    return (
        <button className="icon-btn" onClick={handleLogout}>
            <img src={MenuIcon} alt="Logout" />
        </button>
    )
}

export default Logout