import {
  combineReducers,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import ModeReducer from "./reducers/modeReducer";
import UserReducer from "./reducers/userReducer";
import CurrentUserInfoReducer from "./reducers/currentUserReducer";
const reducer = combineReducers({
  Mode: ModeReducer,
  Users: UserReducer,
  CurrentUserInfo: CurrentUserInfoReducer
});

const initialState = {};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
