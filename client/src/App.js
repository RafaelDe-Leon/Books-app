import React from "react";
import { StaticRouter, BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import {/* getCookie, */ authenticateUser } from "./utils/handleSessions";

const PrivateRoute = ({ component: Component, state: state, ...rest }) => (
  <Route {...rest} render={(props) => (
    state.authenticated === true
      ? <Component {...props} />
      : state.loading === true
        ? <div></div>
        : <Redirect to='/' />
  )} />
)

class App extends React.Component {
  // check cookie
  // getCookie();
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      loading: false,
      ssr: props.ssr ? true : false
    }
  }


  authenticate = () => authenticateUser()
    .then(auth => this.setState({ authenticated: auth.status == 200 ? true : false, loading: false }))
    .catch(err => console.log(err))

  componentWillMount() {
    this.authenticate();
  }

  render() {
    const RouterComponent = this.state.ssr ? StaticRouter : Router;

    return (
      <RouterComponent>

        <div>

          <Nav />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) =>
                <Login {...props} authenticate={this.authenticate} authenticated={this.state.authenticated} />}
            />
            <Route
              exact
              path="/signup"
              render={(props) =>
                <Signup {...props} authenticate={this.authenticate} authenticated={this.state.authenticated} />}
            />
            <PrivateRoute exact path="/books" state={this.state} component={Books} />
            <Route component={NoMatch} />
          </Switch>

        </div>
      </RouterComponent>

    )
  }
}

export default App;
