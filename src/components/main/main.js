import React, {Component} from 'react';

import styles from './main.module.css'
import ClusteringConfigurator from "./components/clustering-configurator/clustering-configurator";
import SherlockRun from "./clusters/sherlock.run";

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sherlockDto: undefined
    }
    this.handleClusters = this.handleClusters.bind(this)
  }

  handleClusters(sherlockDto) {
    this.setState({
      sherlockDto: sherlockDto
    })
  }

  render() {
    return (
      <div className={styles.contentcontainer}>
        <ClusteringConfigurator handleClusters = {this.handleClusters}/>
        <SherlockRun sherlockDto = {this.state.sherlockDto}/>
      </div>
    );
  }
}

export default Main;

