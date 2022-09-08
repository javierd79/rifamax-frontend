import { Switch } from "react-router-dom";
import AuthRouter from "./components/auth/AuthRouter";
import Router from "./routes/Router";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
