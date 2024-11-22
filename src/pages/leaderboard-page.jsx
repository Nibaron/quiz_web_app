import Header from '../components/layouts/header';
import Avatar from '../assets/avater.webp';
import { useContext, useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { useAuth } from '../hooks/useAuth';
import { QuizIdContext } from '../context';
import { useLocation } from 'react-router-dom';
import { getOrdinalSuffix } from '../utils/common-functions';
import Loading from '../components/common/loading';
import Error from '../components/common/error';


export default function LeaderBoardPage() {

    const { quizId } = useContext(QuizIdContext);
    const location = useLocation();
    const [leaderboardData, setLeaderboardData] = useState(null);
    const { questionsData } = location.state || {};
    const [userPosition, setUserPosition] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { api } = useAxios();
    const { auth } = useAuth();

    useEffect(() => {
        const fetchResultData = async () => {
            try {
                setLoading(true);
                const response = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${quizId}/attempts`
                );
                if (response.status === 200) {
                    const attempts = response?.data?.data?.attempts || [];

                    // Calculate scores dynamically
                    const scoredData = attempts.map((attempt) => {
                        const totalScore = attempt.submitted_answers.reduce((total, answer, idx) => {
                            return answer?.answer === attempt.correct_answers[idx]?.answer
                                ? total + (attempt.correct_answers[idx]?.marks || 0)
                                : total;
                        }, 0);

                        return {
                            ...attempt,
                            score: totalScore,
                        };
                    });

                    // Sort users by score (descending)
                    const sortedData = scoredData.sort((a, b) => b.score - a.score);

                    // Assign ranks with ties
                    let rank = 1;
                    const rankedData = sortedData.map((user, index, arr) => {
                        if (index > 0 && user.score !== arr[index - 1].score) {
                            rank = rank + 1;
                        }
                        return { ...user, rank };
                    });

                    // Find user's position
                    const userIndex = rankedData.findIndex(
                        (attempt) => attempt.user.full_name === auth?.user?.full_name
                    );
                    setUserPosition(userIndex >= 0 ? rankedData[userIndex].rank : null);

                    // Slice top 5 users
                    setLeaderboardData(rankedData.slice(0, 5));
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchResultData();
    }, [quizId, api, auth]);


    if (loading) return <Loading />
    if (error) return <Error error={error} />

    return (
        <main className="bg-[#F5F3FF] p-4">
            <Header />

            <section className="min-h-[calc(100vh-50px)] flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/** Left Column */}
                        <div className="bg-primary rounded-lg p-6 text-white">
                            <div className="flex flex-col items-center mb-6">
                                <img src={Avatar} alt="Profile Pic"
                                    className="w-20 h-20 rounded-full border-4 border-white mb-4 object-cover" />
                                <h2 className="text-2xl font-bold">{auth?.user?.full_name}</h2>
                                <p className="text-xl">{`${getOrdinalSuffix(userPosition)} Position`}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="text-center">
                                    <p className="text-sm opacity-75">Mark</p>
                                    <p className="text-2xl font-bold">{questionsData?.marks}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm opacity-75">Correct</p>
                                    <p className="text-2xl font-bold">{questionsData?.correct}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm opacity-75">Wrong</p>
                                    <p className="text-2xl font-bold">{questionsData?.wrong}</p>
                                </div>
                            </div>
                        </div>

                        {/**-- Right Column --*/}
                        <div>
                            <h1 className="text-2xl font-bold">Leaderboard</h1>
                            <p className="mb-6">{questionsData?.quiz?.title}</p>

                            {leaderboardData?.length > 0 ? (
                                <ul className="space-y-4">
                                    {leaderboardData.map((user) => (
                                        <li
                                            key={user.id}
                                            className={`flex items-center justify-between ${auth?.user?.full_name === user?.user?.full_name
                                                ? 'border-2 rounded-lg bg-green-200'
                                                : ''
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                <img
                                                    src={Avatar}
                                                    alt="User Avatar"
                                                    className="object-cover w-10 h-10 rounded-full mr-4"
                                                />
                                                <div>
                                                    <h3 className="font-semibold">
                                                        {user?.user?.full_name}
                                                    </h3>
                                                    <p className="text-bold text-gray-500">
                                                        {getOrdinalSuffix(user?.rank)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="mr-2">{user?.score}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No Data Found</p>
                            )}
                        </div>

                    </div>
                </div>
            </section>
        </main >
    )
}
