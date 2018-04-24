import axios from 'axios';

import {
    GET_ALL_LINKS_FAILED,
    GET_ALL_LINKS_PENDING,
    GET_ALL_LINKS_SUCCESS,
    ADD_LINK
} from './actionTypes';

export const getAllLinks = () => dispatch => {
    dispatch(getAllLinksPending());
    axios.get('/get-all-links')
        .then((res) => {
            dispatch(getAllLinksSuccess(res.data));
        }).catch(err => dispatch(getAllLinksFailed(err)));
};

export const addLink = (payload) => ({
    type: ADD_LINK,
    payload,
});

const getAllLinksSuccess = (payload) => ({
    type: GET_ALL_LINKS_SUCCESS,
    payload,
});

const getAllLinksPending = () => ({
    type: GET_ALL_LINKS_PENDING,
});

export const getAllLinksFailed = (err) => ({
    type: GET_ALL_LINKS_FAILED,
    error: err,
});