const redux = require('redux');
const createStore = redux.createStore;


const initialState = {
    counter: 0
}

// Reducer

const rootReducer = (state = initialState, action) => {

    if (action.type == "INC") {
        return {
            ...state,
            counter: state.counter++
        }
    }
    if (action.type === "ADD") {
        return {
            ...state,
            counter: state.counter + action.value
        }
    }
    return state;

};

// Store
const store = createStore(rootReducer);
console.log("store: ", store.getState());

//Subscription
store.subscribe(() => {
    console.log("[subscription]: ", store.getState());
});

//Dispatching Actions
store.dispatch({ type: "INC" });
store.dispatch({ type: "ADD", value: 10 });


