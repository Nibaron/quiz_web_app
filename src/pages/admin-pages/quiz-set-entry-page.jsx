import Sidebar from '../../components/admin-components/sidebar';
import { useContext, useState } from 'react';
import { QuizIdContext } from '../../context';
import AdminQuestionCard from '../../components/admin-components/admin-question-card';


export default function QuizSetEntryPage() {
    const { quizId } = useContext(QuizIdContext);
    const [adminQuestionsData] = useState([{
        "index": "1",
        "question": "Which of the following is NOT a binary tree traversal method?",
        "options": ["Inorder", "Preorder", "Postorder", "Crossorder"],
        "correctAnswer": "Preorder",
    }]);
    const [singleQuestion, setSingleQuestion] = useState({
        "question": "",
        "options": ["", "", "", ""],
        "correctAnswer": "#",
    })

    console.log(singleQuestion);

    return (
        <main className="bg-[#F5F3FF] min-h-screen flex">
            <Sidebar />

            <section className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
                <div>
                    <nav className="text-sm mb-4" aria-label="Breadcrumb">
                        <ol className="list-none p-0 inline-flex">
                            <li className="flex items-center">
                                <a href="#" className="text-gray-600 hover:text-buzzr-purple">Home</a>
                                <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                    <path
                                        d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                                </svg>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-buzzr-purple" aria-current="page">Quizzes</a>
                            </li>
                        </ol>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 lg:gap-12">
                        {/** Left Column */}
                        <div className="">
                            <h2 className="text-3xl font-bold mb-4">Binary Tree Quiz</h2>
                            <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
                                Total number of questions : 1
                            </div>
                            <p className="text-gray-600 mb-4">
                                Test understanding of binary tree traversal methods, tree properties, and algorithms.
                            </p>

                            <div className="space-y-4">
                                <div className='flex justify-between'>
                                    <h2 className="text-xl font-bold text-foreground">Create Quiz</h2>
                                    <button className="p-2 font-bold rounded-md bg-green-500">Publish Quiz</button>
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
                                        />
                                    </div>
                                ))}

                                <button
                                    className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors">
                                    Save Quiz
                                </button>
                            </div>


                        </div>

                        {/** Right Column */}
                        <div className="px-4">
                            {adminQuestionsData?.map((questionData, idx) => (
                                <AdminQuestionCard
                                    key={idx}
                                    index={questionData.index}
                                    question={questionData?.question}
                                    options={questionData?.options}
                                    correctAnswer={questionData?.correctAnswer}
                                    setSingleQuestion={setSingleQuestion}
                                />
                            ))
                            }
                        </div>
                    </div>
                </div>
            </section>


        </main>
    )
}
