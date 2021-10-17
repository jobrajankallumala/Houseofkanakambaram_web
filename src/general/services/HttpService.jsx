import axios from "axios";
// import { RiDatabase2Fill } from "react-icons/ri";
import CookieService from "./CookieService";

class HttpService {
  async get(url, data = {}) {

    const at = CookieService.get("access_token");

    const headers = {
      Authorization: "Bearer " + at,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    try {
      const response = await axios.get(url, { params: data, headers: headers });
      return response;
    } catch (error) {
      console.error("Not able to fetch data", error);
    }
  }

  async post(url, data, options = null) {
    const at = CookieService.get("access_token");
    const postOptions = {
      headers: {
        Authorization: "Bearer " + at,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const finalOptions = Object.assign(postOptions, options);
    try {
      const response = await axios.post(url, data, finalOptions);

      return response;
    } catch (error) {
      return error.response !== undefined ? error.response : error;
    }
  }

  async filePost(url, data, options = null) {
    const at = CookieService.get("access_token");
    const postOptions = {
      headers: {
        Authorization: "Bearer " + at,
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
    const finalOptions = Object.assign(postOptions, options);
    try {
      const response = await axios.post(url, data, finalOptions);

      return response;
    } catch (error) {
      return error.response !== undefined ? error.response : error;
    }
  }
  async filePut(url, data, options = null) {
    const at = CookieService.get("access_token");
    const postOptions = {
      headers: {
        Authorization: "Bearer " + at,
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
    const finalOptions = Object.assign(postOptions, options);
    try {
      const response = await axios.put(url, data, finalOptions);

      return response;
    } catch (error) {
      return error.response !== undefined ? error.response : error;
    }
  }

  async openPost(url, data, options = null) {
    // const postOptions = {
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'multipart/form-data',
    //   },
    // };
    // const finalOptions = Object.assign(postOptions, options);
    try {
      const response = await axios.post(url, data);
      return response;
    } catch (error) {
      return error.response !== undefined ? error.response : error;
    }
  }

  async openGet(url, data = {}) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    try {
      const response = await axios.get(url, { params: data, headers: headers });
      return response;
    } catch (error) {
      console.error("Not able to fetch data", error);
    }
  }

  async put(url, data, options = null) {
    const at = CookieService.get("access_token");
    const postOptions = {
      headers: {
        Authorization: "Bearer " + at,
      },
    };
    const finalOptions = Object.assign(postOptions, options);
    try {
      return await axios.put(url, data, finalOptions);
    } catch (error) {
      console.error("Not able to fetch data", error);
      return error.response !== undefined ? error.response : error;
    }
  }

  async delete(url) {
    const at = CookieService.get("access_token");
    const options = {
      headers: {
        Authorization: "Bearer " + at,
      },
    };
    // const finalOptions = Object.assign(postOptions, options);
    try {
      return await axios.delete(url, options);
    } catch (error) {
      console.error("Not able to fetch data", error);
      return error.response !== undefined ? error.response : error;
    }
  }

}

export default new HttpService();