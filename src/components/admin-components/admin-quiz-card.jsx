import { useNavigate } from 'react-router-dom'
import { BoxIcon } from '../../assets/icons'

export default function AdminCard({ id, title, description }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/dashboard', { state: { id } })
    }
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group cursor-pointer" onClick={handleClick}>
            <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
                <BoxIcon />
            </div>
            <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">{title}</h3>
            <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">{description}</p>
        </div>
    )
}
