import {AnyAction} from "redux";

export enum UserDispatchAction {
    SET_TOKEN = "SET_TOKEN"
}

export interface IUserStoreStateProps {
    user: IUserStoreState;
}

interface ISetTokenAction extends AnyAction {
    token: string;
}

interface IUserStoreState {
    token: string;
}

function getDefaultState() {
    return {
        token: window.localStorage.getItem("token")
    };
}

export const UserReducer = (state: IUserStoreState = getDefaultState(), action: AnyAction) => {
    switch (action.type) {
        case UserDispatchAction.SET_TOKEN:
            if (action.token === null) {
                window.localStorage.removeItem("token");
            } else {
                window.localStorage.setItem("token", action.token);
            }
            return {...state, token: action.token};
        default:
            return state;
    }
};

export function setTokenAction(token: string): ISetTokenAction {
    return {
        type: UserDispatchAction.SET_TOKEN,
        token
    };
}

export function mapUserStateToProps(state: IUserStoreStateProps): IUserStoreStateProps {
    return {
        user: state.user
    };
}
