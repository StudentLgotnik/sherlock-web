import React, {Component} from 'react';

import './history.module.css';
import ClustersView from "../main/clusters/clustersView/clusters.view";
import Collapsible from "react-collapsible";
import Cookies from 'universal-cookie';
import DeleteRun from "../main/clusters/delete/delete.run";
import CollapsibleButton from "../main/components/collapsible-button/collapsible.button";
import styles from "./history.module.css"
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cookies = new Cookies();

class History extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sherlockRuns: null,
    };
    this.handleClusters = this.handleClusters.bind(this)
    this.requestSherlockRuns = this.requestSherlockRuns.bind(this)
  }

  handleClusters(sherlockRuns) {
    this.setState({
      sherlockRuns: sherlockRuns
    })
  }

  async componentDidMount() {
    await this.requestSherlockRuns()
  }

  async requestSherlockRuns() {
    const token = cookies.get("token")
    if (token) {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': 'Bearer ' + token
        }
      };

      try {
        const response = await fetch('/api/sherlock/runs', requestOptions);
        if (response.ok) {
          const data = await response.json()
          this.handleClusters(data)
        } else {
          toast.error(`Failure! + ${response.status} ${response.statusText}`)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    if (this.state.sherlockRuns === null || this.state.sherlockRuns === undefined) {
      return (
        <div className={styles.contentcontainer}>
          <div className={styles.contentwrapper}>
            <p className={styles.emptyHistoryTxt}>Login / Signup to be able to see the history.</p>
          </div>
        </div>
      )
    } else if (this.state.sherlockRuns.length === 0) {
      return (
        <div className={styles.contentcontainer}>
          <div className={styles.contentwrapper}>
            <p className={styles.emptyHistoryTxt}>Your history is empty.</p>
          </div>
        </div>
      )
    } else {
      return (
        <div className={styles.contentcontainer}>
          <div className={styles.contentwrapper}>
            <ul>
              {this.state.sherlockRuns.map(item => (
                <li>
                  <div className={styles.historyItem}>
                    <Collapsible trigger={<CollapsibleButton collapsibleName={item.runName}/>}>
                      <ClustersView sherlockDto={item}/>
                    </Collapsible>
                    <DeleteRun runGuid={item.guid} updateRuns={this.requestSherlockRuns}/>
                  </div>
                </li>
              ))}
            </ul>
            <ToastContainer/>
          </div>
        </div>
      );
    }
  }
}

export default History;


