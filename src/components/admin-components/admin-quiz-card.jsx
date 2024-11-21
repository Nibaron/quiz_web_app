import { BoxIcon } from '../../assets/icons'
import { useContext } from 'react';
import { QuizIdContext } from '../../context';
import { Link } from 'react-router-dom';

export default function AdminCard({ id, title, description }) {
    const { setQuizId } = useContext(QuizIdContext);
    return (
        <Link
            to='/admin/quiz_set_entry_page'
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group cursor-pointer"
            onClick={() => setQuizId(id)}
        >
            <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
                <BoxIcon />
            </div>
            <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">{title}</h3>
            <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">{description}</p>
        </Link>
    )
}
