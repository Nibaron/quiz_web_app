import { useNavigate } from 'react-router-dom';
import errorIcon from '../../assets/error.svg';

export default function Error(error) {
    const navigate = useNavigate();
    const { status, code, message } = error.error;
    return (
        <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-center space-y-16 lg:space-y-0 space-x-8 2xl:space-x-0">
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center">
                <div>

                    <p className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider text-gray-300">{status}</p>
                    <p className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-gray-300 mt-2">{code}</p>
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-500 my-12">{message}</p>
                </div>
                <button
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark transition-colors"
                    style={{ fontFamily: 'Jaro' }}
                    onClick={() => navigate("/")}
                >
                    Go Back to Home
                </button>
            </div>
            <div className="w-1/2 lg:h-full flex lg:items-end justify-center p-4">
                <img src={errorIcon} alt='errorIcon' />
            </div>
        </div>
    )
}
