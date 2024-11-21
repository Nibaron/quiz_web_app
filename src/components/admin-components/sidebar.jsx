import Avatar from '../../assets/avater.webp';
import LogoWhite from '../../assets/logo-white.svg';
import { useAuth } from '../../hooks/useAuth';

export default function Sidebar() {
    const { auth } = useAuth();
    return (

        <aside className="min-w-64 bg-primary p-6 flex flex-col">
            <div className="mb-10">
                <img src={LogoWhite} className="h-7" />
            </div>
            <nav className="flex-grow">
                <ul className="space-y-2">
                    <li>
                        <a href="#" className="block py-2 px-4 rounded-lg bg-buzzr-purple bg-white text-primary font-bold">Quizzes</a>
                    </li>

                    <li>
                        <a href="#" className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary">Settings</a>
                    </li>

                    <li>
                        <a href="#" className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary">Manage
                            Users</a>
                    </li>

                    <li>
                        <a href="#" className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary">Manage
                            Roles</a>
                    </li>

                    <li>
                        <a href="#" className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary">Logout</a>
                    </li>
                </ul>
            </nav>
            <div className="mt-auto flex items-center">
                <img src={Avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-3 object-cover" />
                <span className="text-white font-semibold">{auth?.user?.full_name}</span>
            </div>
        </aside>

    )
}
