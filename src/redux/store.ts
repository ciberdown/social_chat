import {
  combineReducers,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import ModeReducer from "./reducers/modeReducer";
import UserReducer from "./reducers/userReducer";
const reducer = combineReducers({
  Mode: ModeReducer,
  Users: UserReducer
});

const initialState = {};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
