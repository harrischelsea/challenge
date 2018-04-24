import {
    GET_CURRENT_USER_PENDING,
    GET_CURRENT_USER_FAILED,
    GET_CURRENT_USER_SUCCESS,
    LOGOUT_USER
} from '../actions/actionTypes';

const INITIAL_STATE = {
    loading: true,
    err: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CURRENT_USER_SUCCESS:
            return {...state, user: action.payload, loading: false };
        case GET_CURRENT_USER_PENDING:
            return {...state, loading: true };
        case GET_CURRENT_USER_FAILED:
            return {...state, err: action.payload };
        case LOGOUT_USER:
            return INITIAL_STATE;
        default:
            return state;
    }
}