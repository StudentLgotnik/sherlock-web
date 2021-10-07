import React from 'react';
import {Chart} from "./chart/chart";
import {BsChevronDown} from "react-icons/all";
import Collapsible from "react-collapsible";
import {Dataset} from "./dataset/dataset";

const ClustersView = (props) => {
  // const exist = props.clusters !== undefined
  const clusterList = getClustersListIfExist(props.sherlockDto)
  return (
    <div>
      {clusterList}
      <h3>Input:</h3>
      <p>
        {JSON.stringify(props.sherlockDto)}
      </p>
    </div>
  );
};


function getClustersListIfExist(sherlockDto) {
  if (sherlockDto !== undefined) {
    return (
      <div>
        <Chart clusters = {sherlockDto}/>
        <ul>
          {sherlockDto.clusters.map(item => (
            <li>
              <Collapsible trigger={sherlockDto.runDate}>
                <Dataset testCases = {item.testCases}/>
              </Collapsible>
            </li>
          ))}
        </ul>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default ClustersView;
