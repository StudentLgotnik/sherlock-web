import React from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";

import Header from "../header/header";
import Body from "../body/body";
import styles from "./routes.module.css"


export const Routes = () => {
  return (

    <Router>
      <div className={styles.container}>
        <Header/>
        <Body/>
      </div>
    </Router>
  );
};
