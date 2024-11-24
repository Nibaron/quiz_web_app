import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Sidebar from '../../components/admin-components/sidebar';
import AdminQuestionCard from '../../components/admin-components/admin-question-card';
import { QuizIdContext } from '../../context';
import useAxios from '../../hooks/useAxios';
import Field from '../../components/common/fields';
import { NextIcon } from '../../assets/icons';

export default function QuizSetEntryPage() {
    const { quizId } = useContext(QuizIdContext);
    const { api } = useAxios();
    const [adminQuestionsData, setAdminQuestionsData] = useState([]);
    const [status, setStatus] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [isEditing, setIsEditing] = useState(false);

    const defaultQuestion = {
        id: '',
        question: '',
        options: ['', '', '', ''],
        selectedOption: null,
    };
    const [singleQuestion, setSingleQuestion] = useState(defaultQuestion);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm({
        defaultValues: defaultQuestion,
    });

    const selectedOption = watch('selectedOption');

    useEffect(() => {

        const fetchQuizData = async () => {
            try {
                const { data, status } = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes`);
                if (status === 200) {
                    const filteredData = data.find(quiz => quiz.id === quizId);
                    setAdminQuestionsData(filteredData);
                    setStatus(filteredData?.status);
                }
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Error fetching quiz data:', err);
                }
            }
        };
        fetchQuizData();
    }, [api, quizId, refreshKey]);



    useEffect(() => {
        if (isEditing) {
            reset(singleQuestion);
        }
    }, [singleQuestion, reset, isEditing]);

    const handleDelete = async questionId => {
        try {
            const { status } = await api.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/admin/questions/${questionId}`);
            if (status === 200) {
                setRefreshKey(prev => prev + 1);
                setSingleQuestion(defaultQuestion);
            }
        } catch (err) {
            console.error('Error deleting quiz question:', err);
        }
    };

    const submitForm = async formData => {
        try {
            const selectedOption = formData.selectedOption;
            const payload = {
                options: formData.options,
                question: formData.question,
                correctAnswer: formData.options[selectedOption],
            };

            const url = `${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes/${quizId}/questions`;
            const { status } = await api.post(url, payload);
            if (status === 201) {
                setRefreshKey(prev => prev + 1);
                setSingleQuestion(defaultQuestion);
                setIsEditing(false);
                reset(defaultQuestion);
            }
        } catch (err) {
            console.error('Error adding new quiz question:', err);
        }
    };

    const handleUpdateQuestion = async formData => {
        try {
            const selectedOption = formData.selectedOption;
            const payload = {
                options: formData.options,
                question: formData.question,
                correctAnswer: formData.options[selectedOption],
            };
            const url = `${import.meta.env.VITE_SERVER_BASE_URL}/admin/questions/${singleQuestion.id}`;
            const { status } = await api.patch(url, payload);
            if (status === 200) {
                setRefreshKey(prev => prev + 1);
                setSingleQuestion(defaultQuestion);
                setIsEditing(false);
                reset(defaultQuestion);
            }
        } catch (err) {
            console.error('Error updating quiz question:', err);
        }
    };

    return (
        <main className="bg-[#F5F3FF] min-h-screen flex">
            <Sidebar />

            <section className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
                <div>
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
                        {/* Left Column */}
                        <form onSubmit={isEditing ? handleSubmit(handleUpdateQuestion) : handleSubmit(submitForm)}>
                            <h2 className="text-3xl font-bold mb-4">{adminQuestionsData?.title}</h2>
                            <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
                                {`Total number of questions: ${adminQuestionsData?.Questions?.length || 0}`}
                            </div>
                            <p className="text-gray-600 mb-4 text-justify">{adminQuestionsData?.description}</p>

                            <div className="space-y-4">
                                <div className='flex justify-between'>
                                    <h2 className="text-xl font-bold text-foreground">Create Quiz</h2>
                                    <button className="p-2 font-bold rounded-md bg-green-500">{status === 'draft' ? 'Publish Quiz' : 'Unpublish Quiz'}</button>
                                </div>
                                <Field label="Question Title" error={errors.question}>
                                    <input
                                        {...register('question', { required: 'Question is Required' })}
                                        className={`w-full mt-2 p-2 border rounded-md ${errors.question ? 'border-red-500' : 'border-gray-300'}`}
                                        type="text"
                                        name='question'
                                        placeholder="Enter quiz title"
                                    />
                                </Field>

                                <p className="text-sm text-gray-600 mt-4">Add Options</p>

                                {/* Error messages for selectedOption and options */}


                                {singleQuestion.options.map((_, idx) => (
                                    <div key={idx} className="flex items-center space-x-2 bg-white rounded-md px-4 py-1">
                                        <input
                                            type="radio"
                                            name='selectedOption'
                                            id='selectedOption'
                                            value={idx}
                                            checked={selectedOption === idx}
                                            onChange={() => setValue('selectedOption', idx)}
                                            className="text-primary focus:ring-0 w-4 h-4"
                                            required
                                        />

                                        <input
                                            {...register(`options.${idx}`, { required: 'Option cannot be empty' })}
                                            className="w-full p-2 bg-transparent text-foreground outline-none"
                                            placeholder={`Option ${idx + 1}`}
                                            required
                                        />

                                    </div>
                                ))}

                                <button type="submit" className="w-full bg-primary text-white p-2 rounded-md">
                                    {isEditing ? 'Update Quiz' : 'Save Quiz'}
                                </button>
                            </div>
                        </form>

                        {/* Right Column */}
                        <div className="max-h-screen h-full">
                            <div className="h-[calc(100vh-50px)] overflow-y-scroll">
                                {adminQuestionsData?.Questions?.map((questionData, index) => (
                                    <AdminQuestionCard
                                        key={questionData?.id}
                                        index={index + 1}
                                        questionData={questionData}
                                        setSingleQuestion={setSingleQuestion}
                                        onDelete={handleDelete}
                                        setIsEditing={setIsEditing}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
