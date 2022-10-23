import { Switch } from "react-router-dom";
//import { allRifasWhichAvailable } from "./assets/data/rifas";
import AuthRouter from "./components/auth/AuthRouter";
import Router from "./routes/Router";
import { useAuthDispatch, logout } from "./context/auth";
import moment from 'moment';

let logoutUserAutomatic;

function App() {

  function automatize(){
    logoutUserAutomatic = setInterval(verifyLogout, 12000);
  }
  
  const dispatch = useAuthDispatch();

  function verifyLogout(){
    if (moment(new Date()).format('MM-DD-YYYY HH:mm') >= moment(localStorage.getItem('exp')).format('MM-DD-YYYY HH:mm')) {
      logout(dispatch);
      window.location.href = "/login";
      clearInterval(logoutUserAutomatic);
    }
  }
    automatize();
  return (
    <Switch>
      {Router.map((route) => (
        <AuthRouter
          key={route.path}
          path={route.path}
          component={route.component}
          isPrivate={route.isPrivate}
        />
      ))}
    </Switch>
  );
}

export default App;
