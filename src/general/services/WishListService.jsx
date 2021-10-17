import CookieService from "./CookieService";
import axios from "axios";
import UrlService from "./UrlService";
import CurrencyStorage from "../localStorage/CurrencyStorage";
class WishListService {
    async getUserWish() {
        let activeCurrencyId = CurrencyStorage.loadActiveState();
        let params = { currency_id: activeCurrencyId }
        const at = CookieService.get("access_token");
        const headers = {
            Authorization: "Bearer " + at,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        try {
            const response = await axios.get(UrlService.getAllWishUrl(), { params: params,headers: headers });
            return response;
        } catch (error) {
            console.error("Not able to fetch data", error);
        }
    }
    async addWishList(id) {
        const at = CookieService.get("access_token");
        let activeCurrencyId = CurrencyStorage.loadActiveState();
        let params = { currency_id: activeCurrencyId }
      
        const headers = {
            Authorization: "Bearer " + at,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        try {
            const response = await axios.get(UrlService.addToWishUrl(id),{ params: params, headers: headers } );
            return response;
        } catch (error) {
            console.error("Not able to fetch data", error);
        }
    }
    async removeUserWish(id) {
        const at = CookieService.get("access_token");
        let activeCurrencyId = CurrencyStorage.loadActiveState();
        let params = { currency_id: activeCurrencyId }

        const headers = {
            Authorization: "Bearer " + at,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        try {
            const response = await axios.get(UrlService.removeWishUrl(id), { params: params,headers: headers });
            return response;
        } catch (error) {
            console.error("Not able to fetch data", error);
        }
    }
}

export default new WishListService();