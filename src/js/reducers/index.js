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
    ACCESS_TOKEN,
    USER,
    ADD_TO_CART,
    ADD_TO_WISH_LIST,
    CART_SUMMARY,
    TEST,
    SET_ACTIVE_CURRENCY
} from "../constants/action-types";

const initialState = {
    articles: [],
    categories: [],
    allSettings: {},
    showSignUp: false,
    showSignIn: false,
    showSearchFilter: false,
    showTodo: false,
    access_token: '',
    user: {},
    theme: 'light',
    bag: {},
    wishList: [],
    test: 0,
    cart_summary: {},
    category_id: '',
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ARTICLE:

            return Object.assign({}, state, {
                articles: state.articles.concat(action.payload)
            });
        case ADD_CATEGORIES:

            return Object.assign({}, state, {
                categories: action.payload
            });
        case ADD_ALL_AETTINGS:

            return Object.assign({}, state, {
                allSettings: action.payload
            });
        case ADD_TO_CART:

            return Object.assign({}, state, {
                bag: action.payload
            });
        case SET_CATEGORY_ID:

            return Object.assign({}, state, {
                category_id: action.payload
            });
        case ADD_TO_WISH_LIST:

            return Object.assign({}, state, {
                wishList: [].concat(action.payload)
            });
        case CART_SUMMARY:
            return Object.assign({}, state, {
                cart_summary: state.cart_summary = {
                    sub_total: action.payload.sub_total,
                    tax_amount: action.payload.tax_amount,
                    total: action.payload.total,
                }
            });
        case TEST:

            return Object.assign({}, state, {
                test: action.payload
            });
        case USER:
            return Object.assign({}, state, {
                user: action.payload
            });
        case ACCESS_TOKEN:
            return Object.assign({}, state, {
                access_token: action.payload
            });
        case SIGN_UP_SHOW:
            return Object.assign({}, state, {
                showSignUp: action.payload
            });
        case SIGN_IN_SHOW:
            return Object.assign({}, state, {
                showSignIn: action.payload
            });
        case SEARCH_FILTER_SHOW:
            return Object.assign({}, state, {
                showSearchFilter: action.payload
            });
        case TODO_SHOW:
            return Object.assign({}, state, {
                showTodo: action.payload
            });
        case THEME_TOGGLE:
            return Object.assign({}, state, {
                theme: action.payload
            });
        default:
            return state
    }
}


export default rootReducer;