import { useState } from "react";

import { QuizIdContext } from "../context";

const QuizIdProvider = ({ children }) => {
    const [quizId, setQuizId] = useState("287e6049-9e59-49ea-bb41-9a0387dce648");
    return (
        <QuizIdContext.Provider value={{ quizId, setQuizId }}>
            {children}
        </QuizIdContext.Provider>
    )
}

export default QuizIdProvider;