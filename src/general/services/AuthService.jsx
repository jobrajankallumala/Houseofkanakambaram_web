import axios from "axios";
import UrlService from "./UrlService";
import HttpService from './HttpService'
import CookieService from "./CookieService";

const expiresAt = 60 * 24;

interface Credentials {
    username: string;
    password: string;
}

const postOptions = {
    withCredentials: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
    },

};

const authHeader = {
    auth: {
        // grant_type: 'password',
        username: process.env.REACT_APP_CLIENT_ID,
        password: process.env.REACT_APP_CLIENT_SECRET
    }

}



// const token = Buffer.from(`${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`, 'utf8').toString('base64')

class AuthService {
    async doUserLogin(credentials: Credentials) {

        try {
            var data = new FormData();
            // data.append('grant_type', 'password');
            data.append('username', credentials.username);
            data.append('password', credentials.password);
            // data.append('scope', 'READ');

            var config = {
                method: 'post',
                url: UrlService.signinUrl(),
                headers: {
                    // 'Authorization': `Basic ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data: data
            };

            const response = await axios(config)
            // .then(function (response) {
            //     console.log(response)
            //     return { data: response.data, status: 100 };
            // })
            // .catch(function (error) {
            //     return { status: 400, data: error };
            // });
            return { data: response.data, status: 100 };

        } catch (error) {
            // console.error("Error", error.response);
            return { status: 400, data: error };
        }
    }
    async handleLoginSuccess(response: any, remember: boolean) {

        if (!remember) {
            const options = { path: "/" };
            CookieService.set("access_token", response.token, options);
            // const user = await this.getMyProfile(response.access_token)
            // CookieService.set("user", user.data, options);
            // return user;
            return true;
        }

        let date = new Date();
        date.setTime(date.getTime() + expiresAt * 60 * 1000);
        const options = { path: "/", expires: date };
        CookieService.set("access_token", response.token, options);
        // const user = await this.getMyProfile(response.access_token);
        // CookieService.set("user", user.data, options);
        // return user;
        return true;
    }
    async getMyProfile(at) {
        const headers = {
            Authorization: "Bearer " + at,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        try {
            const response = await axios.get(UrlService.myProfileUrl(), { headers: headers });
            return response;
        } catch (error) {
            console.error("Not able to fetch data", error);
        }
    }

    async logOut(data={}) {
        const at = CookieService.get("access_token");

        const postOptions = {
            headers: {
                Authorization: "Bearer " + at,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await axios.post(UrlService.logOut(),data, postOptions);
            return response;
        } catch (error) {
            console.error("Not able to fetch data", error);
        }
    }
    // async resendOtp(data) {
    //     let url = UrlService.resentAccountVerificationOtpUrl();
    //     let response = await HttpService.postNoAuth(url, data);

    //     return response;
    // }
}

export default new AuthService();