import { Link } from 'react-router-dom';
import Sidebar from '../../components/admin-components/sidebar';
import { BackIcon } from '../../assets/icons';

export default function QuizSetPage() {

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

                        <form>
                            <div className="mb-4">
                                <label htmlFor="quiz-title" className="block text-sm font-medium text-gray-700 mb-1">Quiz title</label>
                                <input type="text" id="quiz-title" name="quiz-title"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
                                    placeholder="Quiz" />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="quiz-description" className="block text-sm font-medium text-gray-700 mb-1">Description
                                    (Optional)</label>
                                <textarea id="quiz-description" name="quiz-description" rows="4"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
                                    placeholder="Description"></textarea>
                            </div>

                            <Link to="/admin/quiz_set_entry_page" type="submit"
                                className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                Next
                            </Link>
                        </form>
                    </div>


                </div>
            </div>
        </main>
    )
}
