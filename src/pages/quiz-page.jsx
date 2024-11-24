import Logo from '../assets/logo.svg';
import Avatar from '../assets/avater.webp';
import Footer from '../components/layouts/footer';
import { useContext, useEffect, useReducer, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';
import { initialState, QuizReducer } from '../reducers/attend-quiz-reducer';
import { actions } from '../actions';
import { Link, useNavigate } from 'react-router-dom';
import { QuizIdContext } from '../context';
import Error from '../components/common/error';


export default function QuizPage() {
    const { auth, setAuth } = useAuth();
    const { api } = useAxios();
    const { quizId } = useContext(QuizIdContext);
    const [state, dispatch] = useReducer(QuizReducer, initialState);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [givenAnswer, setGivenAnswer] = useState("");
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({ type: actions.quiz.DATA_FETCHING });
        const fetchQuiz = async () => {
            try {
                const response = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${quizId}`
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

    }, [api, quizId])

    const handleLogout = () => {
        setAuth({});
        localStorage.removeItem("auth");
        navigate("/login");
    }


    const handleSubmitQuiz = async (payload) => {
        try {
            const response = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${quizId}/attempt`, payload);

            if (response.status === 200) {
                navigate("/result_page");
            }

        } catch (error) {
            console.error(error);
        }
    }

    const { questions, title, description, stats } = state?.quizData?.data || {};
    const { question, options, id } = questions?.[currentQuestionIndex] || {};

    if (state.error) return <Error error={state.error} />

    return (
        <main className="bg-[#F5F3FF] min-h-screen">
            <div className="container mx-auto py-3">
                <header className="flex justify-between items-center mb-8">
                    <Link to="/" >
                        <img src={Logo} className="h-7" />
                    </Link>
                    <button
                        className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
                        style={{ fontFamily: 'Jaro' }}
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </header>

                <section className="max-w-8xl mx-auto h-[calc(100vh-10rem)]">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
                        {/** Left Column */}
                        <div className="lg:col-span-1 bg-white rounded-md p-6 h-full flex flex-col">
                            <div>
                                <h2 className="text-4xl font-bold mb-4">{title}</h2>
                                <p className="text-gray-600 mb-4">{description}</p>

                                <div className="flex flex-col">
                                    <div
                                        className="w-fit bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                                        {`Total number of questions : ${stats?.total_questions}`}
                                    </div>

                                    <div
                                        className="w-fit bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                                        {`Participation : ${currentQuestionIndex + 1}`}
                                    </div>

                                    <div
                                        className="w-fit bg-gray-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                                        {`Remaining : ${stats?.total_questions - currentQuestionIndex - 1}`}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto flex items-center">
                                <img src={Avatar} alt="avatar" className="w-10 h-10 rounded-full mr-3 object-cover" />
                                <span className="text-black font-semibold">{auth?.user?.full_name}</span>
                            </div>
                        </div>


                        {/**right column */}
                        <div className="lg:col-span-2 bg-white">
                            <div className="bg-white p-6 !pb-2 rounded-md">

                                {/**Question */}
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-semibold">{`${currentQuestionIndex + 1}. ${question}`}</h3>
                                </div>

                                {/** options */}
                                <div className="grid grid-cols-2 gap-4">
                                    {options?.map((option, idx) => (
                                        <label
                                            key={idx}
                                            className={`flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg ${givenAnswer === option ? "bg-indigo-100" : ""}`}
                                        >
                                            <input
                                                type="checkbox"
                                                name={`question-${currentQuestionIndex}`}
                                                value={option}
                                                checked={givenAnswer === option}
                                                onChange={() => { setGivenAnswer(option) }}
                                                className="form-radio text-buzzr-purple"
                                            />
                                            <span>{option}</span>
                                        </label>
                                    ))}
                                </div>

                                {/** button */}
                                {(currentQuestionIndex < stats?.total_questions - 1) ? (
                                    <button
                                        className="w-1/2 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
                                        onClick={() => {
                                            setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
                                            setAnswers((prevAnswers) => ({
                                                ...prevAnswers,
                                                [id]: givenAnswer,
                                            }));
                                            setGivenAnswer("");
                                        }}
                                    >
                                        Next
                                    </button>
                                )
                                    :
                                    (<Link
                                        to="/result_page"
                                        className="w-1/2 text-center ml-auto block bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
                                        onClick={() => {
                                            const updatedAnswers = {
                                                ...answers,
                                                [id]: givenAnswer
                                            };
                                            const payload = {
                                                answers: { ...updatedAnswers }
                                            };
                                            handleSubmitQuiz(payload);
                                        }}

                                    >
                                        Submit
                                    </Link>

                                    )}
                            </div>
                        </div>
                    </div>
                </section>
            </div >

            <Footer />
        </main >
    )
}
