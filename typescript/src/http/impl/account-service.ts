import {HttpService} from "../http-service";
import * as _ from "lodash";
import {StoreService} from "../../store/store-service";
import {setAccountAction} from "../../store/user/user-store";

export interface IBasicAccountInfo {
    id: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    url: any;
    id_info: any;
    basic_info: any;
    investment_profile: any;
    international_info: any;
    employment: any;
    additional_info: any;
}

class AccountServiceImpl extends HttpService {

    public async basic(): Promise<IBasicAccountInfo> {
        const resp = await this.request("/user/");

        for (const prop in resp) {
            if (!resp.hasOwnProperty(prop)) {
                continue;
            }

            // make sure the value is a string and a url
            const url: any = resp[prop];
            if (!_.isString(url) || url.indexOf("http") !== 0) {
                continue;
            }

            // fetch the data and attach it
            resp[prop] = await this.request(url, {
                fullUrl: true
            });
        }

        StoreService.getStore().dispatch(setAccountAction(resp));

        return resp;
    }

}

export const AccountService = new AccountServiceImpl();
