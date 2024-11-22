import Sidebar from '../../components/admin-components/sidebar';
import { useContext, useEffect, useState } from 'react';
import { QuizIdContext } from '../../context';
import AdminQuestionCard from '../../components/admin-components/admin-question-card';
import useAxios from '../../hooks/useAxios';
import { NextIcon } from '../../assets/icons';


export default function QuizSetEntryPage() {
    const { quizId } = useContext(QuizIdContext);
    const { api } = useAxios();
    const [adminQuestionsData, setAdminQuestionsData] = useState([]);
    const [status, setStatus] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [singleQuestion, setSingleQuestion] = useState({
        "id": "",
        "question": "",
        "options": ["", "", "", ""],
        "correctAnswer": "",
    })

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const { data, status } = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes`);

                if (status === 200) {
                    const filteredData = data.find(quiz => quiz.id === quizId);
                    setAdminQuestionsData(filteredData);
                    setStatus(filteredData?.status);
                }
            } catch (err) {
                console.error("Error fetching quiz data:", err);
            }
        };
        fetchQuizData();
    }, [api, quizId, refreshKey]);

    const handleDelete = async (questionId) => {
        try {
            const { status } = await api.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/admin/questions/${questionId}`);
            if (status === 200) {
                setRefreshKey(prev => prev + 1);
                setSingleQuestion({
                    "id": "",
                    "question": "",
                    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                    "correctAnswer": "option 1",
                });
            }
        } catch (err) {
            console.error("Error deleting quiz question:", err);
        }
    };

    const handleCreateQuestion = async () => {
        try {
            let url = `${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes/${quizId}/questions`;
            const { status } = await api.post(url, singleQuestion);
            if (status === 201) {
                setRefreshKey(prev => prev + 1);
                setSingleQuestion({
                    "id": null,
                    "question": "",
                    "options": ["", "", "", ""],
                    "correctAnswer": "#",
                });
            }
        } catch (err) {
            console.error("Error adding new quiz question:", err);
        }
    }

    const handleUpdateQuestion = async () => {
        try {
            let url = `${import.meta.env.VITE_SERVER_BASE_URL}/admin/questions/${singleQuestion.id}`;
            const { status } = await api.patch(url, singleQuestion);
            if (status === 200) {
                setRefreshKey(prev => prev + 1);
                setSingleQuestion({
                    "id": null,
                    "question": "",
                    "options": ["", "", "", ""],
                    "correctAnswer": "#",
                });
            }
        } catch (err) {
            console.error("Error updating quiz question:", err);
        }
    }

    //console.log(singleQuestion);

    return (
        <main className="bg-[#F5F3FF] min-h-screen flex">
            <Sidebar />

            <section className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
                <div >
                    <nav className="text-sm mb-4" aria-label="Breadcrumb">
                        <ol className="list-none p-0 inline-flex">
                            <li className="flex items-center">
                                <a href="#" className="text-gray-600 hover:text-buzzr-purple">Home</a>
                                <NextIcon />
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-buzzr-purple" aria-current="page">Quizzes</a>
                            </li>
                        </ol>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 lg:gap-12">
                        {/** Left Column */}
                        <div className="">
                            <h2 className="text-3xl font-bold mb-4">{adminQuestionsData?.title}</h2>
                            <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
                                {`Total number of questions : ${adminQuestionsData?.Questions?.length || 0}`}
                            </div>
                            <p className="text-gray-600 mb-4 text-justify">
                                {adminQuestionsData?.description}
                            </p>

                            <form className="space-y-4" onSubmit={() => isEditing ? handleUpdateQuestion() : handleCreateQuestion()}>
                                <div className='flex justify-between'>
                                    <h2 className="text-xl font-bold text-foreground">Create Quiz</h2>
                                    <button className="p-2 font-bold rounded-md bg-green-500">{status === 'draft' ? 'Publish Quiz' : 'Unpublish Quiz'}</button>
                                </div>

                                <div>
                                    <label htmlFor="quizTitle" className="block text-sm font-medium text-foreground mb-1">Question Title</label>
                                    <input type="text" id="quizTitle" name="quizTitle"
                                        className="w-full mt-2 p-2 border border-input rounded-md bg-background text-foreground"
                                        placeholder="Enter quiz title"
                                        value={singleQuestion.question}
                                        onChange={(e) =>
                                            setSingleQuestion((prev) => ({ ...prev, question: e.target.value }))
                                        }
                                        required
                                    />
                                </div>

                                <p className="text-sm text-gray-600 mt-4">Add Options</p>

                                {singleQuestion.options.map((option, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white"
                                    >
                                        <input
                                            type="radio"
                                            name="correctAnswer"
                                            value={option}
                                            checked={singleQuestion.correctAnswer === option}
                                            onChange={() =>
                                                setSingleQuestion((prev) => ({ ...prev, correctAnswer: option }))
                                            }
                                            className="text-primary focus:ring-0 w-4 h-4"
                                            required
                                        />
                                        <input
                                            type="text"
                                            value={option}
                                            onChange={(e) => {
                                                const newOptions = [...singleQuestion.options];
                                                newOptions[idx] = e.target.value;
                                                setSingleQuestion((prev) => ({
                                                    ...prev,
                                                    options: newOptions,
                                                }));
                                            }}
                                            className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                                            placeholder={`Option ${idx + 1}`}
                                            required
                                        />
                                    </div>
                                ))}


                                <button
                                    className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors"
                                    type='submit'
                                >
                                    Save Quiz
                                </button>
                            </form>


                        </div>

                        {/** Right Column */}
                        <div className="max-h-screen h-full">
                            <div className="h-[calc(100vh-50px)] overflow-y-scroll ">
                                <div className="px-4">
                                    {singleQuestion && adminQuestionsData?.Questions?.map((questionData, index) => (
                                        <AdminQuestionCard
                                            key={questionData?.id}
                                            index={index + 1}
                                            id={questionData?.id}
                                            question={questionData?.question}
                                            options={questionData?.options}
                                            correctAnswer={questionData?.correctAnswer}
                                            setSingleQuestion={setSingleQuestion}
                                            onDelete={handleDelete}
                                            setIsEditing={setIsEditing}
                                        />
                                    ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
