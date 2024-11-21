import { Link } from 'react-router-dom';
import Sidebar from '../../components/admin-components/sidebar';
import { PlusIcon } from '../../assets/icons';
import { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import AdminCard from '../../components/admin-components/admin-quiz-card';


export default function Dashboard() {

    const { api } = useAxios();
    const [adminQuizData, setAdminQuizData] = useState([]);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes`);
                if (response.status === 200) {
                    setAdminQuizData(response?.data);
                }
            } catch (err) {
                console.error("Error:", err.message);
            }
        };
        fetchQuizData();
    }, []);
    console.log(adminQuizData)

    return (
        <main className="bg-gray-100 min-h-screen flex">

            <Sidebar />

            <section className="flex-grow p-10">
                <header className="mb-8">
                    <h2 className="text-2xl font-semibold">Hey There 👋!</h2>
                    <h1 className="text-4xl font-bold">Welcome Back To Your Quiz Hub!</h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/** add new */}
                    <Link to="/admin/quiz_set" className="group">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 ">
                            <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
                                <PlusIcon />
                            </div>
                            <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">Create a new quiz</h3>
                            <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">Build from the ground up</p>
                        </div>
                    </Link>

                    {/** existing quiz */}
                    {adminQuizData.map(quizData => (
                        <AdminCard
                            key={quizData.id}
                            id={quizData.id}
                            title={quizData.title}
                            description={quizData.description}
                        />
                    )
                    )}
                </div>
            </section>
        </main>
    )
}
