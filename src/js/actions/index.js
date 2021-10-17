import {
    ADD_ARTICLE,
    ADD_CATEGORIES,
    SET_CATEGORY_ID,
    ADD_ALL_AETTINGS,
    SIGN_UP_SHOW,
    SIGN_IN_SHOW,
    SEARCH_FILTER_SHOW,
    TODO_SHOW,
    THEME_TOGGLE,
    USER,
    ACCESS_TOKEN,
    ADD_TO_CART,
    ADD_TO_WISH_LIST,
    TEST,
    CART_SUMMARY,
    SET_ACTIVE_CURRENCY
} from "../constants/action-types";
import HttpService from '../../general/services/HttpService';
import UrlService from '../../general/services/UrlService';

export function addArticle(payload) {
    return { type: ADD_ARTICLE, payload }
};

export function signUpShow(payload) {

    return { type: SIGN_UP_SHOW, payload }
};

export function signInShow(payload) {
    return { type: SIGN_IN_SHOW, payload }
};

export function searchFilterShow(payload) {
    return { type: SEARCH_FILTER_SHOW, payload }
};

export function todoShow(payload) {
    return { type: TODO_SHOW, payload }
};

export function themeToggle(payload) {
    return { type: THEME_TOGGLE, payload }
};

export function userAccessToken(payload) {
    return { type: ACCESS_TOKEN, payload }
};
export function currentUser(payload) {
    return { type: USER, payload }
};

export function addToCart(payload) {
    return { type: ADD_TO_CART, payload }
};
export function addToWishList(payload) {
    return { type: ADD_TO_WISH_LIST, payload }
};
export function addTest(payload) {
    return { type: TEST, payload }
};
export function addCartSummary(payload) {
    return { type: CART_SUMMARY, payload }
};
export function setCategoryId(payload) {
    return { type: SET_CATEGORY_ID, payload }
};

export const addCategories = () => {
    return dispatch => {
        HttpService.get(UrlService.categoryListUrl())
            .then(response => {
                if (response && response.data.status) {
                    dispatch({
                        type: ADD_CATEGORIES,
                        payload: response.data.data.categories
                    });
                }
            });
    };
};

export const addAllSettings = () => {
    return dispatch => {
        HttpService.get(UrlService.allSettingsUrl())
            .then(response => {
                if (response && response.data.status && response.data.data) {
                    dispatch({
                        type: ADD_ALL_AETTINGS,
                        payload: response.data.data
                    });
                    // if (response.data.data.currencies) {
                    //     dispatch({
                    //         type: SET_ACTIVE_CURRENCY,
                    //         payload: response.data.data.currencies[0].value
                    //     });
                    // }
                }
            });
    };
};