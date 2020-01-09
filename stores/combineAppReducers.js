import { combineReducers } from "redux";
import tradeReducer from "./trade/tradeReducer";

const combineAppReducers = () => {
    return combineReducers({
        trade: tradeReducer,
      });
}

export default combineAppReducers;
