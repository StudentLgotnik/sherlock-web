import React from 'react';
import Collapsible from "react-collapsible";

const TestCase = props => {
  return (
    <Collapsible trigger={props.testCase.testName}>
      <p>{props.testCase.stackTrace}</p>
    </Collapsible>
  );
};

export default TestCase;
