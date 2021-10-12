import React, {Component} from 'react';
import {BsChevronDown, BsChevronUp} from "react-icons/all";
import styles from "./collapsible.button.module.css"

class CollapsibleButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    }
    this.rotate = this.rotate.bind(this)
  }

  rotate() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    return (
      <>
        <button className={styles.collapsible_btn} onClick={this.rotate}>
          {this.props.collapsibleName}
          {this.state.collapsed === false ? <BsChevronDown className={styles.collapsible_arrow}/> : <BsChevronUp className={styles.collapsible_arrow}/>}
        </button>
      </>
    );
  }
}

export default CollapsibleButton;