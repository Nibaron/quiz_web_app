import { BoxIcon, DeleteIcon } from '../../assets/icons';
import { useContext } from 'react';
import { QuizIdContext } from '../../context';
import { Link } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';

export default function AdminCard({ id, title, description, setRefreshKey }) {
    const { setQuizId } = useContext(QuizIdContext);
    const { api } = useAxios();

    const handleDeleteClick = async (e) => {
        e.stopPropagation();
        try {
            const { status } = await api.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes/${id}`);
            if (status === 200) {
                setRefreshKey(prev => prev + 1);
            }
        } catch (err) {
            console.error('Error deleting quiz question:', err);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group cursor-pointer flex justify-between">
            <Link
                to='/admin/quiz_set_entry_page'
                className="block"
                onClick={() => setQuizId(id)}
            >
                <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
                    <div className='flex justify-between'>
                        <BoxIcon />
                    </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">{title}</h3>
                <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">{description}</p>
            </Link>

            <div onClick={handleDeleteClick}>
                <DeleteIcon />
            </div>
        </div>
    );
}
