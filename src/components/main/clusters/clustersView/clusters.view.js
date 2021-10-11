import React from 'react';
import Collapsible from "react-collapsible";
import {Dataset} from "../dataset/dataset";
import Chart from "../chart/chart";

const ClustersView = (props) => {
  const clusterList = getClustersListIfExist(props.sherlockDto)
  return (
    <div>
      {clusterList}
    </div>
  );
};

function getClustersListIfExist(sherlockDto) {
  if (sherlockDto !== undefined) {
    return (
      <div>
        <Chart sherlockDto = {sherlockDto}/>
        <ul>
          {sherlockDto.clusters.map(item => (
            <li>
              <Collapsible trigger={item.name}>
                <Dataset testCases = {item.testCases}/>
              </Collapsible>
            </li>
          ))}
        </ul>
      </div>
    )
  } else {
    return (
      <div/>
    )
  }
}

export default ClustersView;
