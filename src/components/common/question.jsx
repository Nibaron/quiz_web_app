export default function Question({ index, title, options, answer, submitted_answer }) {

    const isCorrect = (answer === submitted_answer);

    return (
        <div className="rounded-lg overflow-hidden shadow-sm mb-4">
            <div className={`p-6 ${isCorrect ? "bg-green-200" : "bg-red-100"}`}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                        {`${index}. ${title}`}
                    </h3>
                </div>
                <div className="space-y-2">
                    {options.map((option, idx) => (
                        <label key={idx} className="flex items-center space-x-3">
                            <input
                                type="radio"
                                name={`answer${index}`}
                                className="form-radio text-buzzr-purple"
                                checked={option === answer}
                                disabled={option !== answer}
                            />
                            <span>{option}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div
                className={`flex space-x-4 px-6 py-2 ${isCorrect ? "bg-green-600" : "bg-red-600"
                    }`}
            >
                <button className="text-lg font-medium text-white">
                    {`Submitted Answer: ${submitted_answer}`}
                </button>
            </div>
        </div>
    );
}
