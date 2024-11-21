import Header from '../components/layouts/header';
import Avatar from '../assets/avater.webp';
import { useContext, useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { useAuth } from '../hooks/useAuth';
import { QuizIdContext } from '../context';


export default function LeaderBoardPage() {

    const { quizId } = useContext(QuizIdContext);
    const [leaderboardData, setLeaderboardData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { api } = useAxios();
    const { auth } = useAuth();

    useEffect(() => {
        const fetchResultData = async () => {
            try {
                setLoading(true);
                const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${quizId}/attempts`);
                if (response.status === 200) {
                    setLeaderboardData(response.data.data);
                }
            } catch (err) {
                console.error("Error:", err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchResultData();
    }, [quizId, api, auth]);

    console.log(leaderboardData)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error...</p>;
    return (
        <body className="bg-[#F5F3FF]  p-4">
            <Header />

            <main className="min-h-[calc(100vh-50px)] flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/** Left Column */}
                        <div className="bg-primary rounded-lg p-6 text-white">
                            <div className="flex flex-col items-center mb-6">
                                <img src={Avatar} alt="Profile Pic"
                                    className="w-20 h-20 rounded-full border-4 border-white mb-4 object-cover" />
                                <h2 className="text-2xl font-bold">Saad Hasan</h2>
                                <p className="text-xl">20 Position</p>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="text-center">
                                    <p className="text-sm opacity-75">Mark</p>
                                    <p className="text-2xl font-bold">1200</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm opacity-75">Correct</p>
                                    <p className="text-2xl font-bold">08</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm opacity-75">Wrong</p>
                                    <p className="text-2xl font-bold">16</p>
                                </div>
                            </div>
                        </div>

                        {/**-- Right Column --*/}
                        <div>
                            <h1 className="text-2xl font-bold">Leaderboard</h1>
                            <p className="mb-6">React Hooks Quiz</p>
                            {leaderboardData && leaderboardData.attempts ?
                                <ul className="space-y-4">
                                    {leaderboardData.attempts.map((attempt, index) => {
                                        const correctCount = attempt.submitted_answers.reduce(
                                            (count, answer, idx) =>
                                                answer?.answer ===
                                                    attempt.correct_answers[idx]?.answer
                                                    ? count + 1
                                                    : count,
                                            0
                                        );
                                        const score = correctCount * 5;
                                        return (
                                            <li key={attempt.id} className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <img src={Avatar} alt="SPD Smith" className="object-cover w-10 h-10 rounded-full mr-4" />
                                                    <div>
                                                        <h3 className="font-semibold">{attempt.user.full_name}</h3>
                                                        <p className="text-sm text-gray-500">{index + 1}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="mr-2">{score}</span>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                                :
                                <p>No Data Found</p>
                            }
                        </div>

                    </div>
                </div>
            </main>
        </body>
    )
}
