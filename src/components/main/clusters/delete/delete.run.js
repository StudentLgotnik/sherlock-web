import React, {Component} from "react";
import {BsTrash} from "react-icons/all";
import Cookies from "universal-cookie";
import styles from "./delete.run.module.css"
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cookies = new Cookies();

class DeleteRun extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sherlockRunGuid: props.runGuid,
    };

    this.deleteSherlockRun = this.deleteSherlockRun.bind(this)
  }

  deleteSherlockRun() {
    const requestOptions = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + cookies.get("token")}
    };

    fetch(`/api/sherlock/runs/${this.state.sherlockRunGuid}`, requestOptions)
      .then(res => res.ok ? this.props.updateRuns() : toast.error(`Failure! ${res.status} + ${res.statusText}`))

  }

  render() {
    return (
      <>
        <button className={styles.deleteRun} onClick={this.deleteSherlockRun}>
          <BsTrash/>
        </button>
        <ToastContainer/>
      </>
    );
  }
}

export default DeleteRun