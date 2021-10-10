import React, {Component} from 'react';

import './history.css';
import ClustersView from "../main/clusters/clustersView/clusters.view";
import Collapsible from "react-collapsible";
import Cookies from 'universal-cookie';
import DeleteRun from "../main/clusters/delete/delete.run";

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
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'Authorization': 'Bearer ' + cookies.get("token") }
    };

    try {
      const response = await fetch('/api/sherlock/runs', requestOptions);
      if (response.ok) {
        const data  = await response.json()
        this.handleClusters(data)
      } else {
        alert("Failure!" + response.status + response.statusText)
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (this.state.sherlockRuns === null || this.state.sherlockRuns === undefined) {
      return (
        <span>Login / Signup to be able to see the history.</span>
      )
    } else if (this.state.sherlockRuns.length === 0) {
      return (
        <span>Your history is empty.</span>
      )
    } else {
      return (
        <ul>
          {this.state.sherlockRuns.map(item => (
            <li>
              <Collapsible trigger={item.runName}>
                <ClustersView sherlockDto={item}/>
              </Collapsible>
              <DeleteRun runGuid={item.guid} updateRuns={this.requestSherlockRuns}/>
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default History;


