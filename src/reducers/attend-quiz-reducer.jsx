import { actions } from "../actions";

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
            return {
                ...state,
                quizData: action.data,
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