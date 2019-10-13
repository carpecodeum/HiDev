import React from 'react';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";
import Navbar from "./components/layout/Navbar.js";
import Landing from "./components/layout/Landing.js";
import Register from "./components/auth/Register.js";
import Login from "./components/auth/Login.js";
import Developers from "./components/auth/Developers.js"
import PrivateRoute from "./components/privateroutes/privateroutes";
import Dashboard from "./components/dashboard/dashboard";
import { clearcurrentprofile } from './actions/profileaction';

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000; 
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearcurrentprofile());
    window.location.href = "./login";
  }
}
function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
      <Navbar />
      <Route exact path="/" component={Landing} />
      <div className="container">
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/developers" component={Developers} />
      <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
    </div>
    </Router>
    </Provider>
  );
}

export default App;
