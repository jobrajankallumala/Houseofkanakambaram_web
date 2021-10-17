import CookieService from "./CookieService";
import axios from "axios";
import UrlService from "./UrlService";
import CartTtemsStorage from "../localStorage/CartTtemsStorage";
import CurrencyStorage from "../localStorage/CurrencyStorage";
class CartService {
    amount(item) {
        return item.total;
    }
    sum(prev, next) {
        return prev + next;
    }
    async getUserCart(addressId = null) {
        const at = CookieService.get("access_token");
        let activeCurrencyId = CurrencyStorage.loadActiveState();
        let params = { currency_id: activeCurrencyId }
        const headers = {
            Authorization: "Bearer " + at,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        if (addressId) {
            params.address_id = addressId;
        }
        try {
            const response = await axios.get(UrlService.getCartUrl(), { params: params, headers: headers });
            return response;
        } catch (error) {
            console.error("Not able to fetch data", error);
        }
    }

    async addUserCart(data) {
        const at = CookieService.get("access_token");
        let activeCurrencyId = CurrencyStorage.loadActiveState();
        data.currency_id = activeCurrencyId;

        const postOptions = {
            headers: {
                Authorization: "Bearer " + at,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await axios.post(UrlService.addToCartUrl(), data, postOptions);
            return response;
        } catch (error) {
            console.error("Not able to fetch data", error);
        }
    }
    async removeUserCart(productId) {
        const at = CookieService.get("access_token");
        let activeCurrencyId = CurrencyStorage.loadActiveState();
        let params = { currency_id: activeCurrencyId }
        const headers = {
            Authorization: "Bearer " + at,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        try {
            const response = await axios.get(UrlService.removeCartUrl(productId), { params: params, headers: headers });
            return response;
        } catch (error) {
            console.error("Not able to fetch data", error);
        }
    }
    async multipleAddUserCart(data) {
        const at = CookieService.get("access_token");
        let activeCurrencyId = CurrencyStorage.loadActiveState();
        data.currency_id = activeCurrencyId;

        const postOptions = {
            headers: {
                Authorization: "Bearer " + at,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await axios.post(UrlService.multipleProductToCartUrl(), data, postOptions);
            return response;
        } catch (error) {
            console.error("Not able to fetch data", error);
        }
    }

    async getLocalCart(addressId = null) {
        let items = CartTtemsStorage.loadState();
        return items;
    }

    async addLocalCart(prevCart = {}, item, quantity = 1) {
        let activeCurrencyId = CurrencyStorage.loadActiveState();

        let cartItems = [];
        let total = ''
        let cart = {}
        let price = 0;
        let exItemIndex = -1

        if (prevCart.products) {
            cartItems = prevCart.products;
            exItemIndex = prevCart.products.findIndex(e => e.product_id == item.id);
        }
        price = item.discount_price ? item.discount_price : item.price;

        let newData = {
            product_id: item.id,
            name: item.name,
            quantity: quantity,
            image: item.images ? item.images[0] : item.image,
            price: price,
            total: price * quantity,
            sub_total: price * quantity,
            tax_amount: 0,
            stock: item.stock
        }

        // if item already in cart
        if (exItemIndex >= 0) {
            cartItems[exItemIndex] = newData;
        } else {
            cartItems.push(newData);
        }

        total = cartItems.map(this.amount).reduce(this.sum);

        cart = {
            products: cartItems,
            total: total,
            tax_amount: 0,
            currency: item.currency,
            currency_id: activeCurrencyId,
            sub_total: total
        }

        //save to localstorage
        CartTtemsStorage.saveState(cart);
        return cart
    }
    async postQuantityForLocalCart(prevCart = {}, index, data) {
        let activeCurrencyId = CurrencyStorage.loadActiveState();
        let total = 0
        let cart = {}
        if (prevCart.products) {
            prevCart.products[index].quantity = data.quantity;
            prevCart.products[index].total = prevCart.products[index].price * data.quantity;
            prevCart.products[index].sub_total = prevCart.products[index].price * data.quantity;
            total = prevCart.products.map(this.amount).reduce(this.sum);

            cart = {
                products: prevCart.products,
                total: total,
                tax_amount: 0,
                currency: prevCart.currency,
                currency_id: activeCurrencyId,
                sub_total: total
            }

            //save to localstorage
            CartTtemsStorage.saveState(cart);
            return cart
        }
    }

    async removeLocalCart(prevCart = {}, index) {
        let activeCurrencyId = CurrencyStorage.loadActiveState();
        let bag = prevCart;
        let total = 0
        let cart = {}
        if (bag.products) {

            if (bag.products.length > 0) {
                bag.products.splice(index, 1);
            }
            if (bag.products.length > 0) {
                total = bag.products.map(this.amount).reduce(this.sum);
            }
            cart = {
                products: bag.products,
                total: total,
                tax_amount: 0,
                currency: prevCart.currency,
                currency_id: activeCurrencyId,
                sub_total: total
            }

            //save to localstorage
            CartTtemsStorage.saveState(cart);
            return cart
        }
    }

    async clearLocalCart() {
        CartTtemsStorage.saveState({});

        return true
    }
}

export default new CartService();