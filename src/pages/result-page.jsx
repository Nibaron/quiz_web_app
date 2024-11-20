import { Link } from 'react-router-dom';
import LogoWhite from '../assets/logo-white.svg';
import { useContext, useEffect, useState } from 'react';
import { QuizIdContext } from '../context';
import useAxios from '../hooks/useAxios';
import Question from '../components/common/question';
import { useAuth } from '../hooks/useAuth';
import CircularProgressBar from '../components/circular-progress-bar';

export default function ResultPage() {
    const { quizId } = useContext(QuizIdContext);
    const [questionsData, setQuestionsData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { api } = useAxios();
    const { auth } = useAuth();

    //fetch attempted quiz result Data
    useEffect(() => {
        const fetchResultData = async () => {
            try {
                setLoading(true);
                const [response1, response2] = await Promise.all([
                    api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${quizId}/attempts`),
                    api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${quizId}`),
                ]);
                if (response1.status === 200 && response2.status === 200) {

                    // Push the submitted answer field to the specific question
                    const submitted_answers = response1?.data?.data?.attempts.filter(attempt => attempt.user.full_name === auth?.user?.full_name)?.[0].submitted_answers;

                    const updatedQuestions = response2?.data?.data?.questions.map((question) => {
                        const submittedAnswer = submitted_answers?.find(
                            (attempt) => attempt.question_id === question.id
                        )?.answer;
                        return { ...question, submittedAnswer };
                    });

                    // Calculate correct, wrong, and total marks
                    let correct = 0;
                    let wrong = 0;
                    let marks = 0;

                    updatedQuestions.forEach((question) => {
                        if (question.submittedAnswer === question.correctAnswer) {
                            correct++;
                            marks += question.marks;
                        } else {
                            wrong++;
                        }
                    });

                    setQuestionsData({
                        quiz: response1?.data?.data?.quiz,
                        questions: updatedQuestions,
                        correct,
                        wrong,
                        marks
                    });
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

    //console.log(questionsData)


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error...</p>;

    return (
        <body className="bg-background text-foreground min-h-screen">
            <div className="flex min-h-screen overflow-hidden">
                <Link to="/"><img src={LogoWhite} className="max-h-11 fixed left-6 top-6 z-50" /></Link>
                {/** Left side */}
                <div className="max-h-screen overflow-hidden hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center p-12 relative">
                    <div>
                        <div className="text-white">
                            <div>
                                <h2 className="text-4xl font-bold mb-2">{questionsData?.quiz?.title}
                                </h2>
                                <p>{questionsData?.quiz?.description} </p>
                            </div>

                            <div className="my-6 flex items-center  ">
                                <div className="w-1/2">
                                    <div className="flex gap-6 my-6">
                                        <div>
                                            <p className="font-semibold text-2xl my-0">{questionsData?.quiz?.total_questions}</p>
                                            <p className="text-gray-300">Questions</p>
                                        </div>

                                        <div>
                                            <p className="font-semibold text-2xl my-0">{questionsData?.correct}</p>
                                            <p className="text-gray-300">Correct</p>
                                        </div>

                                        <div>
                                            <p className="font-semibold text-2xl my-0">{questionsData?.wrong}</p>
                                            <p className="text-gray-300">Wrong</p>
                                        </div>
                                    </div>

                                    <Link to="/leaderboard_page"
                                        className=" bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white">
                                        View Leaderboard
                                    </Link>
                                </div>

                                <div className="w-1/2 bg-primary/80 rounded-md border border-white/20 flex items-center p-4">
                                    <div className="flex-1">
                                        <p className="text-2xl font-bold">{`${questionsData?.marks}/${questionsData?.quiz?.total_marks}`}</p>
                                        <p>Your Mark</p>
                                    </div>
                                    <div>
                                        <CircularProgressBar percentage={(questionsData?.marks * 100 / questionsData?.quiz?.total_marks).toFixed(2)} />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/** Right side */}
                <div className="max-h-screen md:w-1/2 flex items-center justify-center h-full p-8">
                    <div className="h-[calc(100vh-50px)] overflow-y-scroll ">
                        <div className="px-4">
                            {questionsData?.questions?.map((questionData, idx) => (
                                <Question
                                    index={idx + 1}
                                    key={idx}
                                    title={questionData?.question}
                                    options={questionData?.options}
                                    answer={questionData?.correctAnswer}
                                    submitted_answer={questionData?.submittedAnswer}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}