import React from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class CookieService {
  get(key: string) {
    return cookies.get(key);
  }

  set(key: string, value: string, options: object) {
    cookies.set(key, value, options);
  }

  remove(key: string) {
    cookies.remove(key, {path: "/"})  
    console.log(key)
  }
}

export default new CookieService();