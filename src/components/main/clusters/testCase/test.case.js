import React from 'react';
import Collapsible from "react-collapsible";
import CollapsibleButton from "../../components/collapsible-button/collapsible.button";

const TestCase = props => {
  return (
    <Collapsible trigger={<CollapsibleButton collapsibleName={props.testCase.testName}/>}>
      <p>{props.testCase.stackTrace}</p>
    </Collapsible>
  );
};

export default TestCase;
