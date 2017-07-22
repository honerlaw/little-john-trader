import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRedux from "react-redux";
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";
import {Provider} from "react-redux";
import {StoreService} from "../store/store-service";
import {IUserStoreStateProps, mapUserStateToProps} from "../store/user/user-store";
import {Auth} from "./user/auth";
import {ReduxDashboard} from "./app/dashboard";

import "../../../assets/style.scss";

export class Main extends React.Component<IUserStoreStateProps, {}> {

    public render(): JSX.Element {
        if (this.props.user.token === null) {
            return <Auth/>;
        }
        return <ReduxDashboard/>;
    }

}

// add redux to the app
export const ReduxMain = ReactRedux.connect<any, any, any>(mapUserStateToProps, null)(Main);

// append app container to body
const ele: Element = document.createElement("div");
ele.id = "container";
document.getElementsByTagName("body")[0].appendChild(ele);

// render the app
ReactDOM.render(<Provider store={StoreService.getStore()}>
    <Router>
        <Route exact path="/" component={ ReduxMain } />
    </Router>
</Provider>, document.getElementById("container"));
