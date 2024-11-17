
import Logo from '../../assets/logo.svg';
import Logout from '../auth/logout';
import { useAuth } from '../../hooks/useAuth';

import { Link } from 'react-router-dom';
import { MenuIcon } from '../../assets/icons';

const Header = () => {
    const { auth } = useAuth();
    return (
        <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
            <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
                <Link to="/">
                    <img
                        className="max-w-[100px] lg:max-w-[140px]"
                        src={Logo}
                        alt="logo" />
                </Link>

                <div className="flex items-center space-x-4">
                    <Link to="/" className="btn-primary">
                        <img src={MenuIcon} alt="Home" />
                        Home
                    </Link>

                    <Logout />

                    <Link
                        to="/me"
                        className="flex-center !ml-8 gap-3">
                        <span className="text-lg font-medium lg:text-xl">{auth?.user?.full_name}</span>
                        <img className="max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px]"
                            src={MenuIcon} alt="avatar" />
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Header;