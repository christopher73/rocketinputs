import React, {useContext} from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  DashboardPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  PrivateRoutePage,
  ContactAccountPage,
  ContactLeadPage,
  ContactNonePage
} from "./pages";

import { RocketContext, RocketProvider } from './context/rocket'

function App() {
  const [ auth, saveAuth ] = useContext(RocketContext);
  return (
    <Router>
        <RocketProvider value={[ auth, saveAuth ]}>
        <Switch>
          <Route exact path="/" render={props => (<LoginPage {...props} />)} />
          <Route exact path="/register" render={props => (<RegisterPage {...props} />)} />
          <Route exact path="/forgot-password" render={props => (<ForgotPasswordPage {...props} />)} />
          <PrivateRoutePage exact path="/dashboard" component={props => (<DashboardPage {...props} />)} /> 
          <PrivateRoutePage exact path="/contact-account" component={props => (<ContactAccountPage {...props} />)} /> 
          <PrivateRoutePage exact path="/contact-lead" component={props => (<ContactLeadPage {...props} />)} /> 
          <PrivateRoutePage exact path="/contact-none" component={props => (<ContactNonePage {...props} />)} /> 
        </Switch>
      </RocketProvider>
    </Router>
    
  );
}

export default App;
