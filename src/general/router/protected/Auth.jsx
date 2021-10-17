// import AuthService from "../../services/AuthService";
import CookieService from "../../services/CookieService";
class Auth {
  constructor() {
    const token = CookieService.get("access_token");
    token ? (this.authenticated = true) : (this.authenticated = false);
  }

  logout() {
    CookieService.remove("access_token");
    CookieService.remove("user");

    this.authenticated = false;
    return true;
    // cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
  getUser() {
    return CookieService.get("user");
  }

  getAccessToken() {
    return CookieService.get("access_token");
  }

}

export default new Auth();