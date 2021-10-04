import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import {MainContent} from "../main-content/main-content";
import {HistoryContent} from "../history-content/history-content";
import styles from "./body.module.css"

class Body extends Component {
  render() {
    return (
      <div className={styles.contentcontainer}>
        <Switch>
          <Route exact path="/">
            <MainContent/>
          </Route>
          <Route path="/history">
            <HistoryContent/>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default Body;