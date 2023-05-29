import {
    combineReducers,
    applyMiddleware,
    legacy_createStore as createStore,
  } from "redux";
  import { composeWithDevTools } from "redux-devtools-extension";
  import thunk from "redux-thunk";
 import ModeReducer from "./reducers/modeReducer";
  const reducer = combineReducers({
    Mode: ModeReducer,
  });
  
  const initialState = {};
  
  const middleware = [thunk];
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  
  export default store;