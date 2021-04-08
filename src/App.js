import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  DashboardPage,
  LoginPage,
  RegisterPage,
  PrivateRoutePage,
} from "./pages";

// Check for token to keep user logged in
// if (localStorage.jwtToken) {
//   // Set auth token header auth
//   const token = localStorage.jwtToken;
//   setAuthToken(token);
//   // Decode token and get user info and exp
//   const decoded = jwt_decode(token);
//   // Set user and isAuthenticated
//   store.dispatch(setCurrentUser(decoded));
//   // Check for expired token
//   const currentTime = Date.now() / 1000; // to get in milliseconds
//   if (decoded.exp < currentTime) {
//     // Logout user
//     store.dispatch(logoutUser());
//     // Redirect to login
//     window.location.href = "./login";
//   }
// }
function App() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Switch>
        <PrivateRoutePage exact path="/dashboard" component={DashboardPage} />
      </Switch>
    </Router>
  );
}

export default App;
