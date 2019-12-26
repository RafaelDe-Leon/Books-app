import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import {/* getCookie, */ authenticateUser} from "./utils/handleSessions";

const PrivateRoute = ({ component: Component, state: state, ...rest  }) => (
  <Route {...rest} render={  (props) => (
    state.authenticated === true 
      ? <Component {...props} />
      : state.loading === true
        ?<div></div>
        : <Redirect to='/' />
  )} />
)
class App extends React.Component {
  // check cookie
  // getCookie();

  state = {
    authenticated: false,
    loading: false
  }

  authenticate = () => authenticateUser()
    .then(auth => this.setState({authenticated: auth.status == 200 ? true : false , loading:false}))
    .catch(err => console.log(err))

  componentWillMount(){
    this.authenticate();
  }
  


  render(){
    return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" render={(props) => <Login {...props} authenticate={this.authenticate} authenticated={this.state.authenticated} />} />
          <Route exact path="/signup"  render={(props) => <Signup {...props} authenticate={this.authenticate} authenticated={this.state.authenticated} />} />
          <PrivateRoute exact path="/books" state={this.state}component={Books} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  )}
}

export default App;
