import * as React from "react";
import {UserService} from "../../http/impl/user-service";

const STYLE: any = {
    form: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }
};

interface IAuthState {
    username: string;
    password: string;
    mfa: boolean;
    mfa_code: string;
}

export class Auth extends React.Component<{}, IAuthState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            username: "",
            password: "",
            mfa: false,
            mfa_code: ""
        };
    }

    private async onSubmit(event: Event): Promise<void> {
        event.preventDefault();
        const code: string = this.state.mfa_code.trim().length > 0 ? this.state.mfa_code : null;
        const success: boolean = await UserService.login(this.state.username, this.state.password, code);
        if (success === false) {
            this.setState({mfa: true});
        }
    }

    public render(): JSX.Element {
        if (this.state.mfa === true) {
            return <form style={STYLE.form} onSubmit={this.onSubmit.bind(this)}>
                <input type="text" placeholder="verification code"
                       value={this.state.mfa_code}
                       onChange={(event) => this.setState({mfa_code: event.target.value})}/>
                <input type="submit" value="login"/>
            </form>;
        }

        return <form style={STYLE.form} onSubmit={this.onSubmit.bind(this)}>
            <input type="text" placeholder="username"
                   value={this.state.username}
                   onChange={(event) => this.setState({username: event.target.value})}/>
            <input type="password" placeholder="password"
                   value={this.state.password}
                   onChange={(event) => this.setState({password: event.target.value})}/>
            <input type="submit" value="login"/>
        </form>;
    }

}
