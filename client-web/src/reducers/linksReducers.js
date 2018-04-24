import {
    GET_ALL_LINKS_SUCCESS,
    GET_ALL_LINKS_PENDING,
    GET_ALL_LINKS_FAILED,
    LOGOUT_USER,
    ADD_LINK
} from '../actions/actionTypes';

const INITIAL_STATE = {
    loading: true,
    err: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_LINKS_SUCCESS:
            return {...state, links: action.payload, loading: false };
        case GET_ALL_LINKS_PENDING:
            return {...state, loading: true };
        case GET_ALL_LINKS_FAILED:
            return {...state, err: action.payload };
        case ADD_LINK:
            return {...state, links: [action.payload, ...state.links] };
        case LOGOUT_USER:
            return INITIAL_STATE;
        default:
            return state;
    }
}