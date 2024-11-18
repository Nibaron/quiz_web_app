import { useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
    const navigate = useNavigate();

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
            <p className="text-lg mb-6 text-gray-700">
                You do not have permission to view this page.
            </p>
            <button
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark transition-colors"
                style={{ fontFamily: 'Jaro' }}
                onClick={() => navigate("/")}
            >
                Go Back to Home
            </button>
        </main>
    );
}
