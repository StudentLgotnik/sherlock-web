import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import Main from "../main/main";
import {History} from "../history/history";

class Body extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Main/>
        </Route>
        <Route path="/history">
          <History/>
        </Route>
      </Switch>
    );
  }
}

export default Body;