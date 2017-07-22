import * as superagent from "superagent";
import {StoreService} from "../store/store-service";
import {IUserStoreStateProps} from "../store/user/user-store";

interface IRequestOptions {
    method?: string;
    fullUrl?: boolean;
    headers?: { [key: string]: string };
    body?: any;
}

export abstract class HttpService {

    private readonly url: string = "https://api.robinhood.com";

    public async request(url: string, options: IRequestOptions = {}): Promise<any> {
        const reqUrl: string = options.fullUrl === true ? url : `${this.url}${url}`;

        const req: superagent.SuperAgentRequest = superagent(options.method || "get", reqUrl);

        if (!options.headers) {
            options.headers = {};
        }

        // add auth header to all requests if available
        const token: string|null = StoreService.getStore<IUserStoreStateProps>().getState().user.token;
        if (token !== null) {
            options.headers.Authorization = `Token ${token}`;
        }

        for (const prop in options.headers) {
            if (options.headers.hasOwnProperty(prop)) {
                req.set(prop, options.headers[prop]);
            }
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

        try {
            const resp: superagent.Response = await req;

            console.log(resp);

            return resp.body;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

}
