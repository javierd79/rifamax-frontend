let user = localStorage.getItem("currentUser")
         ? JSON.parse(localStorage.getItem("currentUser")).user
         : '';
         
let name = localStorage.getItem("name")
         ? JSON.parse(localStorage.getItem("name"))
         : '';

let token = localStorage.getItem("currentUser")
         ? JSON.parse(localStorage.getItem("currentUser")).token
         : '';

let role = localStorage.getItem("currentUser")
         ? JSON.parse(localStorage.getItem("currentUser")).user.role
         : '';

let exp = localStorage.getItem("currentUser")
         ? JSON.parse(localStorage.getItem("currentUser")).user.exp
         : '';

let status = localStorage.getItem("currentUser")
         ? JSON.parse(localStorage.getItem("currentUser")).user.status
         : '';

export const initialState = {
  name: '' || name,
  user: '' || user,
  token: '' || token,
  role: 'undefined' || role,
  exp: '' || exp,
  status: false || status,
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
        errorMessage: {message: 'Unauthorized'},
        private: true,
      };
    default: 
      throw new Error(`Invalid action type: ${action.type}`);
  }
}