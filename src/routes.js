import Auth from "./components/auth/Index";
// import SignUp from "./components/auth/signup/Index";
import Home from "./components/home/Index";
import About from "./components/about/Index";
import Products from "./components/products/Index";
import ProductView from "./components/productLanding/Index";
import Cart from "./components/cart/Index";
import WishList from "./components/wishList/Index";
import Checkout from "./components/checkout/Index";
import Contact from "./components/contact/Index";
import Tm from "./components/tm/Index";
import User from "./components/protected/user/Index";
import OrderDetails from "./components/protected/order/OrderDetails";
import PaymentSuccess from './components/payment/Success'
import PaymentFailed from './components/payment/Failed'

var route = [
    {
        path: "/auth",
        name: "auth",
        icon: "tim-icons icon-chart-pie-36",
        component: Auth,
        layout: "welcome"
    },
    {
        path: "/aboutus",
        name: "about-us",
        icon: "tim-icons icon-chart-pie-36",
        component: About,
        layout: "welcome"
    },
    {
        path: "/contact",
        name: "contact-us",
        icon: "tim-icons icon-chart-pie-36",
        component: Contact,
        layout: "welcome"
    },
    {
        path: "/terms-and-conditions",
        name: "tm",
        icon: "tim-icons icon-chart-pie-36",
        component: Tm,
        layout: "welcome"
    },
    {
        path: "/product/:id",
        name: "product-view",
        icon: "tim-icons icon-chart-pie-36",
        component: ProductView,
        layout: "welcome"
    },
    {
        path: "/my-account",
        name: "my-account",
        icon: "tim-icons icon-chart-pie-36",
        component: User,
        layout: "welcome"
    },
    {
        path: "/orderdetails/:id",
        name: "order-details",
        icon: "tim-icons icon-chart-pie-36",
        component: OrderDetails,
        layout: "welcome"
    },
    
    {
        path: "/search",
        name: "products",
        icon: "tim-icons icon-chart-pie-36",
        component: Products,
        layout: "welcome"
    },
    {
        path: "/checkout",
        name: "checkout",
        icon: "tim-icons icon-chart-pie-36",
        component: Checkout,
        layout: "welcome"
    },
    {
        path: "/cart",
        name: "cart",
        icon: "tim-icons icon-chart-pie-36",
        component: Cart,
        layout: "welcome"
    },
    {
        path: "/wishlist",
        name: "wishlist",
        icon: "tim-icons icon-chart-pie-36",
        component: WishList,
        layout: "welcome"
    },
    {
        path: "/payment/success",
        name: "payment-success",
        icon: "tim-icons icon-chart-pie-36",
        component: PaymentSuccess,
        layout: "welcome"
    },
    {
        path: "/payment/fail",
        name: "payment-failed",
        icon: "tim-icons icon-chart-pie-36",
        component: PaymentFailed,
        layout: "welcome"
    },
    {
        path: "/",
        name: "home",
        icon: "tim-icons icon-chart-pie-36",
        component: Home,
        layout: "welcome"
    },

    {
        path: "/home",
        name: "home",
        icon: "tim-icons icon-chart-pie-36",
        component: Home,
        layout: "welcome"
    },
    // {
    //     path: "/signin",
    //     name: "signin",
    //     icon: "tim-icons icon-chart-pie-36",
    //     component: SignIn,
    //     layout: "welcome"
    // },
    // {
    //     path: "/signup",
    //     name: "signup",
    //     icon: "tim-icons icon-chart-pie-36",
    //     component: SignUp,
    //     layout: "welcome"
    // },
    // {
    //     path: "/",
    //     name: "signin",
    //     icon: "tim-icons icon-chart-pie-36",
    //     component: SignIn,
    //     layout: "welcome"
    // },

]
export default route;