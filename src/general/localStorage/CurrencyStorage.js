class CurrencyStorage {

    static loadActiveState() {
        try {
            let serializedState = localStorage.getItem("activeCurrency");

            if (serializedState === null) {
                return this.initializeState();
            }
            return serializedState;
        }
        catch (err) {
            return this.initializeState();
        }
    }

    static saveActiveState(state) {
        try {
            let serializedState = state;
            localStorage.setItem("activeCurrency", serializedState);

        }
        catch (err) {
        }
    }
   
    static initializeState() {
        return 1
    };
}
 export default CurrencyStorage;