import * as React from "react";
import {AuthService} from "../../http/impl/auth-service";

const STYLE: any = {
    form: {
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -30%)",
        width: "300px"
    },
    link: {
        textAlign: "center",
        width: "calc(100% - 2rem)",
        display: "block",
        padding: "1rem",
        marginBottom: "3rem",
        fontSize: "1.2rem"
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
        const success: boolean = await AuthService.login(this.state.username, this.state.password, code);
        if (success === false) {
            this.setState({mfa: true});
        }
    }

    public render(): JSX.Element {
        if (this.state.mfa === true) {
            return <form style={STYLE.form} onSubmit={this.onSubmit.bind(this)}>
                <h1>verify</h1>
                <input type="text" placeholder="verification code"
                       value={this.state.mfa_code}
                       onChange={(event) => this.setState({mfa_code: event.target.value})}/>
                <input type="submit" value="submit"/>
            </form>;
        }

        return <form style={STYLE.form} onSubmit={this.onSubmit.bind(this)}>
            <h1>login</h1>
            <a style={STYLE.link}
               rel="noopener noreferrer" target="_blank"
               href="https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi/related?hl=en-US">
                Please install this plugin in order to use the webapp.
            </a>
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
