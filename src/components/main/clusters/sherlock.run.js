import React from 'react';
import ClustersView from "./clustersView/clusters.view";
import Cookies from 'universal-cookie';
import {UserContext} from "../../../context/user-context";
import styles from "./sherlock.run.module.css";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cookies = new Cookies();

const SherlockRun = props => {

  const save = e => {
    e.preventDefault()
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + cookies.get("token")},
      body: JSON.stringify(props.sherlockDto)
    };
    fetch('/api/sherlock/runs', requestOptions)
      .then(res => res.ok ? toast.success('Saved') : toast.error(`Failure! ${res.status} + ${res.statusText}`))
  }

  function getSaveBtn(sherlockDto) {
    if (sherlockDto !== undefined) {
      return (
        <>
          <UserContext.Consumer>
            {context => {
              if (context.currentUser === null) {
                return <p className={styles.saveNotification}>Login / Signup To save result</p>
              } else {
                return <button onClick={save} className={styles.saveRun}>
                  Save
                </button>
              }
            }}
          </UserContext.Consumer>
          <ToastContainer/>
        </>
      )
    } else {
      return (
        <div/>
      )
    }
  }

  const saveBtn = getSaveBtn(props.sherlockDto)

  return (
    <div className={styles.contentwrapper}>
      <div className={styles.firstcol}>
        <ClustersView sherlockDto={props.sherlockDto}/>
        {saveBtn}
      </div>
    </div>
  );
};

export default SherlockRun;
