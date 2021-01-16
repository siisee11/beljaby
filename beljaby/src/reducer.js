export const initialState = {
    user: null,
    appuser: null,
    token: null,
  };
  
  export const actionTypes = {
    SET_USER: "SET_USER",
    SET_APPUSER: "SET_APPUSER",
    SET_ACCESS_TOKEN: "SET_ACCESS_TOKEN",
  };
  
  const reducer = (state, action) => {
    console.log(action);
  
    switch (action.type) {
      case actionTypes.SET_USER:
        return {
          ...state,
          user: action.user,
        };
      case actionTypes.SET_APPUSER:
        return {
          ...state,
          appuser: action.appuser,
        };
      case actionTypes.SET_ACCESS_TOKEN:
        return {
          ...state,
          token: action.token,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  