import * as superagent from "superagent";

interface IRequestOptions {
    method: string;
    headers?: { [key: string]: string };
    body?: any;
}

export abstract class HttpService {

    private readonly url: string = "https://api.robinhood.com";

    public async request(url: string, options?: IRequestOptions): Promise<any> {
        const req: superagent.SuperAgentRequest = superagent(!!options ? options.method : "get", `${this.url}${url}`);

        if (options.headers) {
            for (const prop in options.headers) {
                if (options.headers.hasOwnProperty(prop)) {
                    req.set(prop, options.headers[prop]);
                }
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

        const resp: superagent.Response = await req;

        console.log(resp);

        return resp.body;
    }

}
