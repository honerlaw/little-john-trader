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

import "../../../assets/style.scss";

// serve static assets: https://github.com/sdd/serverless-apig-s3

interface IAppProps extends IUserStoreStateProps {

}

export class App extends React.Component<IAppProps, {}> {

    public render(): JSX.Element {
        if (this.props.user.token === null) {
            return <Auth/>;
        }
        return <div>Hello World!</div>;
    }

}

// add redux to the app
export const ReduxApp = ReactRedux.connect<any, any, any>(mapUserStateToProps, null)(App);

// append app container to body
const ele: Element = document.createElement("div");
ele.id = "container";
document.getElementsByTagName("body")[0].appendChild(ele);

// render the app
ReactDOM.render(<Provider store={StoreService.getStore()}>
    <Router>
        <Route exact path="/" component={ ReduxApp } />
    </Router>
</Provider>, document.getElementById("container"));
