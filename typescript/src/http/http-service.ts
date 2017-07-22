import * as superagent from "superagent";
import {StoreService} from "../store/store-service";
import {IUserStoreStateProps} from "../store/user/user-store";

interface IRequestOptions {
    method: string;
    headers?: { [key: string]: string };
    body?: any;
}

export abstract class HttpService {

    private readonly url: string = "https://api.robinhood.com";

    public async request(url: string, options?: IRequestOptions): Promise<any> {
        const req: superagent.SuperAgentRequest = superagent(!!options ? options.method : "get", `${this.url}${url}`);

        if (!options.headers) {
            options.headers = {};
        }

        for (const prop in options.headers) {
            if (options.headers.hasOwnProperty(prop)) {
                req.set(prop, options.headers[prop]);
            }
        }

        // add auth header to all requests if available
        const token: string|null = StoreService.getStore<IUserStoreStateProps>().getState().user.token;
        if (token !== null) {
            options.headers.Authorization = `Token ${token}`;
        }

        if (options.body) {
            if (options.body instanceof FormData) {
                req.set("Content-Type", "application/x-www-form-urlencoded");
                const body: string[] = [];
                for (const key of options.body.keys()) {
                    body.push(`${key}=${options.body.get(key)}`);
                }
                req.send(body.join("&"));
            } else {
                req.send(options.body);
            }
        }

        const resp: superagent.Response = await req;

        console.log(resp);

        return resp.body;
    }

}
