import React from "react";
import App from "./App";
import { StaticRouter, BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

class SsrWrapper extends React.Component {
  // check cookie
  // getCookie();
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div>
        {this.props.ssr
          ? <StaticRouter>
              <App />
            </StaticRouter>
          : <Router>
              <App />
            </Router>
        }
      </div>

    )
  }
}

export default App;
