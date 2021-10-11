import React, {useRef} from 'react';
import Collapsible from "react-collapsible";
import {BsChevronDown} from "react-icons/all";
import styles from "./file-selector.module.css";

const FileSelector = (props) => {

  const form = useRef(null)

  const submit = e => {
    e.preventDefault()
    const data = new FormData(form.current)
    fetch('/api/cluster/', { method: 'POST', body: data})
      .then(res => res.json())
      .then(json => props.handleClusters(json))
  }

  return (
    <form ref={form} onSubmit={submit}>
      <table>
        <tr>
          <td>
            <input type="file" name="files" multiple="multiple"/>
          </td>
        </tr>
        <tr>
          <td>
            <input type="submit" value="Upload" /></td>
        </tr>
        <tr>
          <td>
            <Collapsible trigger={["Advance", <BsChevronDown/>]}>
              <div >
                <div className={styles.advanceCell}>
                  <label className={styles.para}>Epsilon:</label>
                  <RegexInput regex={/[+]?([0-9]*[.])?[0-9]+/} name={"e"}/>
                </div>
                <div className={styles.advanceCell}>
                  <label className={styles.para}>Min points:</label>
                  <RegexInput regex={/^[1-9]+[0-9]*$/} name={"minPts"}/>
                </div>
                <div className={styles.advanceCell}>
                  <label>
                    <input name="n" type="checkbox" value="true"/>
                    Exclude noise
                  </label>
                </div>
              </div>
            </Collapsible>
          </td>
        </tr>
      </table>
    </form>
  )
};

export default FileSelector;

class RegexInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {value: ''};
    this.onChange = this.onChange.bind(this)
  }

  onChange(e){
    const re = this.props.regex;
    if (e.target.value === '' || re.test(e.target.value)) {
      this.setState({value: e.target.value})
    }
  }

  render(){
    return <input name={this.props.name} className={styles.config_input} value={this.state.value} onChange={this.onChange}/>
  }
}
