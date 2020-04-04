import { userConstants } from '../constants'

export function registration(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_SUCCESS:
            return {};
        case userConstants.REGISTER_FAILURE:
            return {};
        case userConstants.REGISTER_REQUEST:
            return { registering: true};
        default:
            return state;
    }
}