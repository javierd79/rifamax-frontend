let user = localStorage.getItem("currentUser")
         ? JSON.parse(localStorage.getItem("currentUser")).user
         : '';

let token = localStorage.getItem("currentUser")
         ? JSON.parse(localStorage.getItem("currentUser")).token
         : '';

let role = localStorage.getItem("currentUser")
         ? JSON.parse(localStorage.getItem("currentUser")).user.role
         : '';

export const initialState = {
  user: '' || user,
  token: '' || token,
  role: '' || role,
  loading: false,
  errorMessage: null,
  private: true,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
        private: true,
      };
  
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        private: false,
      };
      case "LOGOUT":
        return {
          ...initialState,
          user: "",
          token: "",
          private: true,
        };
    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
        private: true,
      };
    default: 
      throw new Error(`Invalid action type: ${action.type}`);
  }
}