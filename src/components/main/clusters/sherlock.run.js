import React from 'react';
import ClustersView from "./clustersView/clusters.view";
import Cookies from 'universal-cookie';
import {UserContext} from "../../../context/user-context";
import {Chart} from "./chart/chart";

const cookies = new Cookies();

const SherlockRun = props => {

  const save = e => {
    e.preventDefault()
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + cookies.get("token") },
      body: JSON.stringify(props.sherlockDto)
    };
    fetch('/api/sherlock/runs', requestOptions)
      .then(res => res.ok ? alert('saved') : alert('Failure!' + res.status + res.statusText))
  }

  function getSaveBtn(sherlockDto) {
    if (sherlockDto !== undefined) {
      return (
        <UserContext.Consumer>
          {context => {
            if (context.currentUser === null) {
              return <span>Login / Signup To save result</span>
            } else {
              return <button onClick={save}>
                Save
              </button>
            }
          }}
        </UserContext.Consumer>
      )
    } else {
      return (
        <div/>
      )
    }
  }

  const saveBtn = getSaveBtn(props.sherlockDto)

  return (
    <div>
      <Chart clusters = {props.sherlockDto}/>
      <ClustersView sherlockDto={props.sherlockDto}/>
      {saveBtn}
    </div>
  );
};

export default SherlockRun;
