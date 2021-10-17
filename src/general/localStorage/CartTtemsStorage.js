class CartTtemsStorage {

    static loadState() {
        try {
            let serializedState = localStorage.getItem("cart");

            if (serializedState === null) {
                return this.initializeState();
            }
            return JSON.parse(serializedState);
        }
        catch (err) {
            return this.initializeState();
        }
    }

    static saveState(state) {
        try {
            let serializedState = JSON.stringify(state);
            localStorage.setItem("cart", serializedState);

        }
        catch (err) {
        }
    }
   
    static initializeState() {
        return {}
    };
}
 export default CartTtemsStorage;