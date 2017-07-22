import * as React from "react";
import * as ReactRedux from "react-redux";
import {AccountService} from "../../http/impl/account-service";
import {IUserStoreStateProps, mapUserStateToProps} from "../../store/user/user-store";
import * as _ from "lodash";

class Dashboard extends React.Component<IUserStoreStateProps, {}> {

    private getHtml(json: any): string {
        let html: string = "";
        for (const prop in json) {
            if (!json.hasOwnProperty(prop)) {
                continue;
            }
            if (_.isObject(json[prop])) {
                html += `<div class="row">
                    <span class="key">${prop}</span>
                    <span class="value">${this.getHtml(json[prop])}</span>
                </div>`;
            } else {
                html += `<div class="row">
                    <span class="key">${prop}</span>
                    <span class="value">${json[prop]}</span>
                </div>`;
            }
        }
        return html;
    }

    public async componentWillMount(): Promise<void> {
        await AccountService.basic();
    }

    public render(): JSX.Element {
        if (this.props.user.account !== null) {
            return <div id="account-info" dangerouslySetInnerHTML={{ __html: this.getHtml(this.props.user.account)}} />;
        }
        return <div>
            loading account data...
        </div>;
    }

}

export const ReduxDashboard = ReactRedux.connect<any, any, any>(mapUserStateToProps, null)(Dashboard);
