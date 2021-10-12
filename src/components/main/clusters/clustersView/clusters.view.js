import React from 'react';
import Collapsible from "react-collapsible";
import {Dataset} from "../dataset/dataset";
import Chart from "../chart/chart";
import CollapsibleButton from "../../components/collapsible-button/collapsible.button";

const ClustersView = (props) => {
  const clusterList = getClustersListIfExist(props.sherlockDto)
  return (
    <div>
      {clusterList}
    </div>
  );
};

function getClustersListIfExist(sherlockDto) {
  if (sherlockDto === null || sherlockDto === undefined) {
    return (
      <div/>
    )
  } else {
    return (
      <div>
        <Chart sherlockDto = {sherlockDto}/>
        <ul>
          {sherlockDto.clusters.map(item => (
            <li>
              <Collapsible trigger={<CollapsibleButton collapsibleName={item.name}/>}>
                <Dataset testCases = {item.testCases}/>
              </Collapsible>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default ClustersView;
