// let apiDomain = "";
// let apiOauthDomain = "";
// let baseDomain = "";
// if (process.env.NODE_ENV === "production") {
//   apiOauthDomain = "http://localhost:9191/";
//   apiDomain = "https://admin.twenty4our.ng/";
//   baseDomain = "https://www.twenty4our.ng/"
// } else {
//   apiOauthDomain = "http://13.233.162.33:9191/";
//   apiDomain = "http://127.0.0.1:8000/";

//   baseDomain = "http://localhost:3000/";
// }
// let baseApi = "api/v1/";

let apiOauthDomain = process.env.REACT_APP_OAUTH_DOMAIN;
let apiDomain = process.env.REACT_APP_API_DOMAIN;
let baseDomain = process.env.REACT_APP_BASE_DOMAIN;
let apiProfileDomain = process.env.REACT_APP_PROFILE_DOMAIN;

class UrlService {
  static basePath() {
    return baseDomain;
    // return apiDomain + "oauth/token";
  }
  static pathName(path) {
    return baseDomain + path.substring(1);
  }
  static apiFileUrl(disk, name) {
    return apiDomain + "api/v1/file?d=" + disk + "&name=" + name;
  }
  static tokenUrl() {
    return apiOauthDomain + "oauth/token";
    // return apiDomain + "oauth/token";
  }
  static testUrl() {
    return apiOauthDomain + "foo";
    // return apiDomain + "oauth/token";
  }

  static signupUrl() {
    return apiDomain + "user/create";
  }
  static signinUrl() {
    return apiDomain + "auth/login";
  }
  static signupWithOtpUrl() {
    return apiDomain + "user/create/with_otp";
  }
  static signinWithOtpUrl() {
    return apiDomain + "auth/login/with_otp";
  }
  static allUsersUrl() {
    return apiProfileDomain + "all";
  }
  static myProfileUrl() {
    return apiProfileDomain + "profile";
  }
  static createUserUrl() {
    return apiProfileDomain + "adduser";
  }
  static getUserUrl(id) {
    return apiProfileDomain + "profile/" + id;
  }
  static updateUserUrl(id) {
    return apiProfileDomain + "profile/" + id;
  }

  static categoryListUrl() {
    return apiDomain + "category/getAllCategories";
  }

  static allSettingsUrl() {
    return apiDomain + "settings/get/all";
  }

  static searchProductsUrl() {
    return apiDomain + "product/allProducts";
  }
  static getProductsUrl(id) {
    return apiDomain + "product/" + id + "/get";
  }
  static contactUrl() {
    return apiDomain + "contact";
  }
  static getCartUrl() {
    return apiDomain + "cart/products"
  }
  static removeCartUrl(productId) {
    return apiDomain + "cart/product/" + productId + "/remove"
  }
  static addToCartUrl() {
    return apiDomain + "cart/product/add"
  }
  static addToWishUrl(productId) {
    return apiDomain + "cart/product/add/" + productId + "/wishlist"
  }
  static removeWishUrl(id) {
    return apiDomain + "cart/product/remove/" + id + "/wishlist"
  }
  static getAllWishUrl() {
    return apiDomain + "cart/product/get/wishlist"
  }
  static getPreferenceUrl() {
    return apiDomain + "product/home/page/preference"
  }
  static multipleProductToCartUrl() {
    return apiDomain + "cart/product/add/multiple"
  }
  static createAddressUrl() {
    return apiDomain + "user/address/create"
  }
  static updateAddressUrl() {
    return apiDomain + "user/address/update"
  }
  static getUserOrderUrl() {
    return apiDomain + "user/order/list"
  }
  static createReviewUrl() {
    return apiDomain + "rating/create"
  }
  static logOut() {
    return apiDomain + "auth/logout"
  }
  static getOrderDetails(orderId) {
    return apiDomain + "user/order/" + orderId + "/details"
  }
  static getInvoiceUrl(orderId) {
    return apiDomain + "user/order/" + orderId + "/invoice"
  }
  static getHomePageReviewsUrl() {
    return apiDomain + "rating/home/page"
  }


  static getAllCountryUrl() {
    return apiDomain + "country/get/all"
  }
  static getAllUserAddressUrl() {
    return apiDomain + "user/address/list"
  }
  static deleteUserAddressUrl(id) {
    return apiDomain + "user/address/" + id + "/delete"
  }
  static checkoutUrl(id) {
    return apiDomain + "checkout/order/place"
  }
  // static userCreateUrl() {
  //   return apiDomain + "user/create";
  // }


}

export default UrlService;