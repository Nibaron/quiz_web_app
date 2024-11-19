import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function QuizQuestion({ index, questionData }) {
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [givenAnswer, setGivenAnswer] = useState("");

    // Shuffle options when the component mounts or questionData changes
    useEffect(() => {
        if (questionData?.options) {
            const optionsCopy = [...questionData.options];
            const shuffled = optionsCopy.sort(() => Math.random() - 0.5);
            setShuffledOptions(shuffled);
        }
    }, [questionData]);

    const handleOptionChange = (option) => {
        setGivenAnswer(option);
    };

    return (
        <div className="lg:col-span-2 bg-white">
            <div className="bg-white p-6 !pb-2 rounded-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-semibold">{`${index}. ${questionData?.question}`}</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {shuffledOptions.map((option, idx) => (
                        <label
                            key={idx}
                            className={`flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg ${givenAnswer === option ? "bg-indigo-100" : ""
                                }`}
                        >
                            <input
                                type="checkbox"
                                name={`question-${index}`}
                                value={option}
                                checked={givenAnswer === option}
                                onChange={() => handleOptionChange(option)}
                                className="form-radio text-buzzr-purple"
                            />
                            <span>{option}</span>
                        </label>
                    ))}
                </div>
                <Link
                    to=""
                    className="w-1/2 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
                >
                    Next
                </Link>
            </div>
        </div>
    );
}
