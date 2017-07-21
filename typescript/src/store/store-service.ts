// basically a proxy for local storage for now, eventually we can use whatever storage we want
import {Store, combineReducers, Reducer, createStore} from "redux";
import {UserReducer} from "./user/user-store";

export class StoreServiceImpl {

    private readonly store: Store<any>;

    constructor() {
        this.store = createStore(combineReducers({
            user: UserReducer
        }));
    }

    public getStore<T>(): Store<T> {
        return this.store;
    }

}

export const StoreService = new StoreServiceImpl();
