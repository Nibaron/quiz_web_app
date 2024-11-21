
import { useAuth } from '../hooks/useAuth';
import Welcome from '../components/welcome';
import Header from '../components/layouts/header';
import Footer from '../components/layouts/footer';
import { useEffect, useState } from 'react';
import QuizCard from '../components/cards/quiz-card';
import axios from 'axios';

const HomePage = () => {
    const { auth } = useAuth();
    const [role] = useState(auth?.user?.role ?? "guest");

    const [quizData, setQuizData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/quizzes`);
                if (response.status === 200) {
                    setQuizData(response?.data?.data);
                }
            } catch (err) {
                console.error("Error:", err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchQuizData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error...</p>;
    console.log(quizData)

    return (
        <main className="bg-[#F5F3FF] min-h-screen">
            <div className="container mx-auto py-3">
                <Header />
                {role === 'user' && <Welcome />}

                <div className="bg-white p-6 rounded-md h-full">
                    <section>
                        <h3 className="text-2xl font-bold mb-6">Participate In Quizees</h3>

                        {/**  Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {
                                quizData.map(quiz => (
                                    <QuizCard
                                        key={quiz?.id}
                                        id={quiz?.id}
                                        title={quiz?.title}
                                        details={quiz?.description}
                                        backgroundImg={quiz?.thumbnail}
                                        is_attempted={quiz?.is_attempted}
                                    />
                                ))
                            }
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        </main>
    )
}

export default HomePage;