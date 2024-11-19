import { actions } from "../actions";
import { shuffleArray } from "../utils/common-functions";

const initialState = {
    quizData: [],
    loading: false,
    error: null,
};

const QuizReducer = (state, action) => {
    switch (action.type) {
        case actions.quiz.DATA_FETCHING: {
            return {
                ...state,
                loading: true,
            };
        }

        case actions.quiz.DATA_FETCHED: {
            const shuffledQuizData = {
                ...action.data,
                data: {
                    ...action.data.data,
                    questions: action.data.data.questions.map((question) => ({
                        ...question,
                        options: shuffleArray([...question.options]),
                    })),
                },
            };

            return {
                ...state,
                quizData: shuffledQuizData,
                loading: false,
            };
        }

        case actions.quiz.DATA_FETCH_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        default: {
            return state;
        }
    }
};

export { initialState, QuizReducer };