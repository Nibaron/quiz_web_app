
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import backGround1 from '../assets/backgrounds/1.jpeg';
import Welcome from '../components/welcome';
import Header from '../components/layouts/header';
import Footer from '../components/layouts/footer';
import { useEffect, useState } from 'react';
import QuizCard from '../components/cards/quiz-card';
import axios from 'axios';

const HomePage = () => {
    const navigate = useNavigate();
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

    return (
        <body className="bg-[#F5F3FF] min-h-screen">
            <div className="container mx-auto py-3">
                <Header />
                {role === 'user' && <Welcome />}

                <main className="bg-white p-6 rounded-md h-full">
                    <section>
                        <h3 className="text-2xl font-bold mb-6" onClick={() => navigate("/admin/dashboard")}>Participate In Quizees</h3>

                        {/**  Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">

                            <Link to="/result_page"
                                className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] relative group cursor-pointer">
                                <div
                                    className="group-hover:scale-105 absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4">
                                    <h1 className=" text-5xl" style={{ fontFamily: 'Jaro' }}>JavaScript Basic Quiz</h1>
                                    <p className="mt-2 text-lg">Test your knowledge of JavaScript basics with quizzes that cover essential
                                        concepts,
                                        syntax, and
                                        foundational
                                        programming skills</p>
                                </div>
                                {/**already Participated */}
                                <div
                                    className="hidden absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white group-hover:grid place-items-center">
                                    <div>
                                        <h1 className="text-3xl font-bold">Already Participated</h1>
                                        <p className="text-center">Click to view your leaderboard</p>

                                    </div>
                                </div>
                                <img src={backGround1} alt="JavaScript Hoisting"
                                    className="w-full h-full object-cover rounded mb-4" />
                            </Link>

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

                            <div
                                className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] cursor-pointer group relative">
                                <div
                                    className="group-hover:scale-105 absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4">
                                    <h1 className=" text-5xl" style={{ fontFamily: 'Jaro' }}>JavaScript Basic Quiz</h1>
                                    <p className="mt-2 text-lg">Test your knowledge of JavaScript basics with quizzes that cover essential
                                        concepts,
                                        syntax, and
                                        foundational
                                        programming skills</p>
                                </div>
                                <img src={backGround1} alt="JavaScript Hoisting"
                                    className="w-full h-full object-cover rounded mb-4 transition-all " />
                            </div>

                            <div
                                className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] relative group cursor-pointer ">
                                <div className="absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4">
                                    <h1 className=" text-5xl" style={{ fontFamily: 'Jaro' }}>JavaScript Basic Quiz</h1>
                                    <p className="mt-2 text-lg">Test your knowledge of JavaScript basics with quizzes that cover essential
                                        concepts,
                                        syntax, and
                                        foundational
                                        programming skills</p>
                                </div>
                                <div
                                    className="hidden absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white group-hover:grid place-items-center">
                                    <div>
                                        <h1 className="text-3xl font-bold">Already Participated</h1>
                                        <p className="text-center">You got 20 out of 50</p>
                                    </div>
                                </div>
                                <img src={backGround1} alt="JavaScript Hoisting"
                                    className="w-full h-full object-cover rounded mb-4 " />
                            </div>

                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </body >
    )
}

export default HomePage;