import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <>

            <div>NotFoundPage</div>
            <button
                className="px-4 py-2 text-center rounded hover:bg-primary hover:text-white transition-colors"
                style={{ fontFamily: 'Jaro' }}
                onClick={() => navigate("/")}
            >
                Go Back
            </button>
        </>
    )
}

export default NotFoundPage