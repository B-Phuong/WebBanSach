import { publisherConstants } from "../actions/constants";

const initState = {
    publishers: [],
    loading: false,
    error: null
};

export default (state = initState, action) => {
    switch (action.type) {
        case publisherConstants.GET_ALL_PUBLISHERS:
            state = {
                ...state,
                publishers: action.payload
            }
    }
    return state;
}