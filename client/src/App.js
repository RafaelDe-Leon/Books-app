import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import {getCookie, authUser} from "./utils/handleSessions";


class App extends React.Component {
  // check cookie
  // getCookie();

  state = {
    authenticated: false,
    loading: true
  }

  componentWillMount(){
    authUser()
      .then(auth => {
        console.log(auth);
        this.setState({authenticated: auth.data, loading:false})})
  }

  PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={  (props) => (
      this.state.authenticated === true 
        ? <Component {...props} />
        : this.state.loading === true
          ?<div></div>
          : <Redirect to='/' />
    )} />
  )

  render(){
    return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <this.PrivateRoute exact path="/books" component={Books} />
          {/* <Route exact path="/books/:id" component={Detail} /> */}
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  )}
}

export default App;
