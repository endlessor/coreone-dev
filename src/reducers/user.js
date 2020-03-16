const initialUserData = {
  isAuthenticated: false,
  isFetchingUser: false,
  FetchingUserError: null,
  userData: {}
};

const user = (state = initialUserData, action) => {
  switch (action.type) {
    case "LOADING_USER":
      return {
        ...state,
        isFetchingUser: true
      };
    case "FAIL_LOGIN":
      return {
        ...state,
        userData: {},
        isAuthenticated: false,
        FetchingUserError: action.error,
        isFetchingUser: false
      }
    case "GET_USER_DATA":
      return {
        ...state,
        userData: action.userData,
        isAuthenticated: true,
        FetchingUserError: null,
        isFetchingUser: false
      };
    case "USER_LOGOUT": 
      return {
        ...state,
        userData: {},
        isAuthenticated: false
      }
    default:
      return state;
  }
};

export default user;
