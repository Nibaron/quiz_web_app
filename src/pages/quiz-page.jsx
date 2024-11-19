import Logo from '../assets/logo.svg';
import Avatar from '../assets/avater.webp';
import Footer from '../components/layouts/footer';
import { useEffect, useReducer } from 'react';
import { useAuth } from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';
import { initialState, QuizReducer } from '../reducers/attend-quiz-reducer';
import { actions } from '../actions';
import QuizQuestion from '../components/quiz/show-quiz-question';

export default function QuizPage() {
    const { auth } = useAuth();
    const { api } = useAxios();
    const [state, dispatch] = useReducer(QuizReducer, initialState);

    useEffect(() => {
        dispatch({ type: actions.quiz.DATA_FETCHING });
        const fetchQuiz = async () => {
            try {
                const response = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/287e6049-9e59-49ea-bb41-9a0387dce648`
                );
                if (response.status === 200) {
                    dispatch({
                        type: actions.quiz.DATA_FETCHED,
                        data: response.data,
                    });
                }
            } catch (error) {
                console.error(error);
                dispatch({
                    type: actions.quiz.DATA_FETCH_ERROR,
                    error: error.message,
                });
            }
        };

        fetchQuiz();

    }, [api])


    return (
        <body className="bg-[#F5F3FF] min-h-screen">
            <div className="container mx-auto py-3">
                <header className="flex justify-between items-center mb-8">
                    <img src={Logo} className="h-7" />
                    <button className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors" style={{ fontFamily: 'Jaro' }}>
                        Logout
                    </button>
                </header>

                <main className="max-w-8xl mx-auto h-[calc(100vh-10rem)]">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
                        {/** Left Column */}
                        <div className="lg:col-span-1 bg-white rounded-md p-6 h-full flex flex-col">
                            <div>
                                <h2 className="text-4xl font-bold mb-4">{state?.quizData?.data?.title}</h2>
                                <p className="text-gray-600 mb-4">{state?.quizData?.data?.description}</p>

                                <div className="flex flex-col">
                                    <div
                                        className="w-fit bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                                        {`Total number of questions : ${state?.quizData?.data?.stats?.total_questions}`}
                                    </div>

                                    <div
                                        className="w-fit bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                                        Participation : 1
                                    </div>

                                    <div
                                        className="w-fit bg-gray-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                                        Remaining : 9
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto flex items-center">
                                <img src={Avatar} alt="avatar" className="w-10 h-10 rounded-full mr-3 object-cover" />
                                <span className="text-black font-semibold">{auth?.user?.full_name}</span>
                            </div>
                        </div>

                        {/**-- Right Column --*/}
                        <QuizQuestion
                            index={'1'}
                            questionData={state?.quizData?.data?.questions[0]}
                        />
                    </div>
                </main>
            </div>

            <Footer />
        </body>
    )
}
