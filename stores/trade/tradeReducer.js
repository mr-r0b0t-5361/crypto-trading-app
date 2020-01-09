const INITIAL_STATE = {
  quotes: [],
  currency: ''
};

const tradeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_QUOTES':
      return {...state, quotes: action.payload}
    case 'UPDATE_CURRENCY':
      return {...state, currency: action.payload}
    default:
      return state
  }
};

export default tradeReducer;
