import React, {Component} from 'react';

import styles from './main.module.css'
import ClusteringConfigurator from "./components/clustering-configurator/clustering-configurator";
import ClustersView from "./clusters/clusters.view";

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
        <ClustersView sherlockDto = {this.state.sherlockDto}/>
        {/*<Chart />*/}
        {/*<Dataset />*/}
      </div>
    );
  }
}

export default Main;

