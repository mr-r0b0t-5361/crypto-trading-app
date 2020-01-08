import { combineReducers } from "redux";
import configReducer from "./config/ConfigReducer";

const combineAppReducers = () => {
    return combineReducers({
        config: configReducer,
      });
}

export default combineAppReducers;
