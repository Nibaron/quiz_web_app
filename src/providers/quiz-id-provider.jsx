import { useEffect, useState } from "react";

import { QuizIdContext } from "../context";

const QuizIdProvider = ({ children }) => {
    const [quizId, setQuizId] = useState(JSON.parse(localStorage.getItem("quizId")) || {});

    useEffect(() => {
        // Store quizId data in local storage whenever it changes
        localStorage.setItem("quizId", JSON.stringify(quizId));
    }, [quizId]);
    return (
        <QuizIdContext.Provider value={{ quizId, setQuizId }}>
            {children}
        </QuizIdContext.Provider>
    )
}

export default QuizIdProvider;