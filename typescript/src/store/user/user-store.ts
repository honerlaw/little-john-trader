import {AnyAction} from "redux";
import {IBasicAccountInfo} from "../../http/impl/account-service";

export enum UserDispatchAction {
    SET_TOKEN = "SET_TOKEN",
    SET_ACCOUNT = "SET_ACCOUNT"
}

export interface IUserStoreStateProps {
    user: IUserStoreState;
}

interface ISetAccountAction extends AnyAction {
    account: IBasicAccountInfo;
}

interface ISetTokenAction extends AnyAction {
    token: string;
}

interface IUserStoreState {
    token: string;
    account: IBasicAccountInfo;
}

function getDefaultState() {
    return {
        token: window.localStorage.getItem("token"),
        account: null
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
        case UserDispatchAction.SET_ACCOUNT:
            return {...state, account: action.account};
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

export function setAccountAction(account: IBasicAccountInfo): ISetAccountAction {
    return {
        type: UserDispatchAction.SET_ACCOUNT,
        account
    };
}

export function mapUserStateToProps(state: IUserStoreStateProps): IUserStoreStateProps {
    return {
        user: state.user
    };
}
