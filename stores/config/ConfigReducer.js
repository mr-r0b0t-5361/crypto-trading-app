const INITIAL_STATE = {
  
};

const configReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CASE 1':
      const newState = {...state, language: action.payload}
      return newState;
    default:
      return state
  }
};

export default configReducer;
