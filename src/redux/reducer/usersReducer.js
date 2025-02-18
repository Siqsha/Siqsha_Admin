import { FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, UPDATE_USER_STATUS, } from "../action/action";

const initialState = {
    users: [],
    pagination: {},
    loading: false,
    error: null,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload.user,
                pagination: action.payload.pagination,
            };
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UPDATE_USER_STATUS: // <-- Handle status update immediately
            return {
                ...state,
                users: state.users.map((user) =>
                    user._id === action.payload.userId
                        ? { ...user, accountStatus: action.payload.newStatus }
                        : user
                ),
            };
        default:
            return state;
    }
};

export default usersReducer;
