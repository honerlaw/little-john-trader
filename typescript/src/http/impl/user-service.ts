import {HttpService} from "../http-service";
import {StoreService} from "../../store/store-service";
import {setTokenAction} from "../../store/user/user-store";

class UserServiceImpl extends HttpService {

    public async login(username: string, password: string, code: string = null): Promise<boolean> {

        const form: FormData = new FormData();
        form.append("username", username);
        form.append("password", password);

        if (code) {
            form.append("mfa_code", code);
        }

        const data = await this.request("/api-token-auth/", {
            method: "post",
            body: form
        });

        if (!data.token) {
            if (data.mfa_required !== true) {
                throw new Error("Invalid login response!");
            }
            return false;
        } else {
            StoreService.getStore().dispatch(setTokenAction(data.token));
            return true;
        }
    }

}

export const UserService = new UserServiceImpl();
