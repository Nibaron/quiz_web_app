import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin-components/sidebar';
import { BackIcon } from '../../assets/icons';
import { useForm } from 'react-hook-form';
import Field from '../../components/common/fields';
import useAxios from '../../hooks/useAxios';
import { useContext } from 'react';
import { QuizIdContext } from '../../context';

export default function QuizSetPage() {
    const { setQuizId } = useContext(QuizIdContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    const { api } = useAxios();
    const navigate = useNavigate();

    const submitForm = async (formData) => {
        try {
            const response = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes/`, formData);

            if (response.status === 201) {
                setQuizId(response?.data?.data?.id);
                navigate("/admin/quiz_set_entry_page");
            }
        } catch (error) {
            console.error(error);
            setError("root.random", {
                type: "random",
                message: `Quiz Set "${formData.title}" failed. Try Again...`,
            })
        }
    }

    return (
        <main className="bg-[#F5F3FF] min-h-screen flex">
            <Sidebar />

            <div className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/**  Left Column */}
                    <div>
                        <Link to="/admin/dashboard" className="inline-flex items-center text-sm text-gray-600 mb-6 hover:text-buzzr-purple">
                            <BackIcon />
                            Back to home
                        </Link>

                        <h2 className="text-3xl font-bold mb-6">Give your quiz title and description</h2>

                        <form onSubmit={handleSubmit(submitForm)} >
                            <div className="mb-4">
                                <Field label="Quiz title" error={errors.title} className="block text-sm font-medium text-gray-700 mb-1">
                                    <input
                                        {...register("title", { required: "Title is Required" })}
                                        className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple border ${errors.title ? "border-red-500" : "border-gray-300"
                                            }`}
                                        type="text"
                                        id="title"
                                        placeholder="Quiz"
                                        autoComplete="title"
                                    />
                                </Field>
                            </div>

                            <div className="mb-6">
                                <Field label="Description" htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1" error={errors.description}>


                                    <textarea
                                        {...register("description", { required: "Description is Required" })}
                                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple ${errors.description ? "border-red-500" : "border-gray-300"
                                            }`}
                                        id="description"
                                        name="description"
                                        rows="4"
                                        placeholder="Description"
                                    ></textarea>
                                </Field>
                            </div>
                            <p className="text-xl text-red-600 mb-6">{errors?.root?.random?.message}</p>

                            <Field>
                                <button type="submit"
                                    className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                    Next
                                </button>
                            </Field>
                        </form>
                    </div>


                </div>
            </div>
        </main>
    )
}
