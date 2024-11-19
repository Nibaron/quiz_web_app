import { useState } from "react";

import { QuizIdContext } from "../context";

const QuizIdProvider = ({ children }) => {
    const [quizId, setQuizId] = useState({});
    return (
        <QuizIdContext.Provider value={{ quizId, setQuizId }}>
            {children}
        </QuizIdContext.Provider>
    )
}

export default QuizIdProvider;