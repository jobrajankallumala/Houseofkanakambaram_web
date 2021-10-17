import axios from "axios";
import UrlService from "./UrlService";
import HttpService from "./HttpService";
import CookieService from "./CookieService";

class UserService {
    async getUser() {
        const url = UrlService.currentUserProfileUrl();
        try {
            const response = HttpService.get(url)
                .then(response => { return response.data })
                .catch(errors => {
                    return errors;
                });

            return response;
        } catch (error) {
            console.error("Not able to fetch the todos");
        }
    }
    setUser(data) {
        const options = { path: "/" };
        CookieService.set("user", data, options);
        return true;
    }
    removeUser() {
        CookieService.remove("access_token");
        CookieService.remove("user");
    }
}

export default new UserService();