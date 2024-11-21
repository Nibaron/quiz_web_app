
export default function AdminQuestionCard({ index, id, question, options, correctAnswer, setSingleQuestion, onDelete, setIsEditing }) {

    const handleEdit = () => {
        setSingleQuestion({
            id,
            question,
            options,
            correctAnswer,
        });
        setIsEditing(true);
    };


    return (
        <div className="rounded-lg overflow-hidden shadow-sm mb-4">
            <div className="bg-white p-6 !pb-2">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                        {`${index}. ${question}`}
                    </h3>
                </div>
                <div className="space-y-2">
                    {options.map((option, idx) => (
                        <label key={idx} className="flex items-center space-x-3">
                            <input
                                type="radio"
                                name={`answer${index}`}
                                className="form-radio text-buzzr-purple"
                                checked={option === correctAnswer}
                                readOnly
                            />
                            <span>{option}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div className="flex space-x-4 bg-primary/10 px-6 py-2">
                <button className="text-red-600 hover:text-red-800 font-medium" onClick={() => onDelete(id)}>Delete</button>
                <button className="text-primary hover:text-primary/80 font-medium" onClick={handleEdit}>Edit Question</button>
            </div>
        </div>
    )
}
