const initialState = {
      info: null,
  };

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          info: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;