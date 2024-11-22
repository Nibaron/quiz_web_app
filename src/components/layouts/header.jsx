import Logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/useAuth';

import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const handleLogout = () => {
        setAuth({});
        localStorage.removeItem("auth");
        navigate("/login");
    }

    return (
        <header className="flex justify-between items-center mb-12">
            <Link to="/">
                <img src={Logo} className="h-7" alt="Logo" />
            </Link>

            <div>
                <button
                    className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
                    style={{ fontFamily: 'Jaro' }}
                    onClick={() => navigate("/login")}
                >
                    Login
                </button>


                <button
                    className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
                    style={{ fontFamily: 'Jaro' }}
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
