import { Link } from "react-router-dom";

export default function QuizCard({ id, title, details, backgroundImg, is_attempted }) {

    const linkDestination = is_attempted ? "/result_page" : "/quiz_page";

    return (
        <Link to={linkDestination}
            className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] cursor-pointer group relative"
            onClick={() => console.log(id)}
        >
            <div
                className="group-hover:scale-105 absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4">
                <h1 className=" text-5xl" style={{ fontFamily: 'Jaro' }}>{title}</h1>
                <p className="mt-2 text-lg">{details}</p>
            </div>

            {/**already Participated */}

            {is_attempted && (
                <div
                    className="hidden absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white group-hover:grid place-items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Already Participated</h1>
                        <p className="text-center">Click to view your leaderboard</p>
                    </div>
                </div>
            )}
            <img src={backgroundImg} alt="JavaScript Hoisting"
                className="w-full h-full object-cover rounded mb-4 transition-all " />
        </Link>
    )
}
