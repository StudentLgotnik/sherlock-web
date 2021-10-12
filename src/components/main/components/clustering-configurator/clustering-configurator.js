import React, {Component} from 'react';
import styles from "./clustering-configurator.module.css";
import FileSelector from "../file-selector/file-selector";
import Collapsible from "react-collapsible";
import {BsChevronDown} from "react-icons/all";
import ClustersView from "../../clusters/clustersView/clusters.view"

class ClusteringConfigurator extends Component {

  render() {
    return (
      <div className={styles.contentwrapper}>
        <div className={styles.firstcol}>
          <div>
            <h1 className={styles.heading}>Select files to cluster them</h1>
          </div>

          <div>
            <p className={styles.para}>all unrecognized files will be ignored</p>
          </div>

          <FileSelector handleClusters = {this.props.handleClusters}/>

        </div>
      </div>
    );
  }
}

export default ClusteringConfigurator;