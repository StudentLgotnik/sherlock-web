import React from 'react';
import Collapsible from "react-collapsible";
import TestCase from "../testCase/test.case";


export const Dataset = props => {
  return (
    <ul>
      {props.testCases.map(item => (
        <li>
          <TestCase testCase={item}/>
        </li>
      ))}
    </ul>
  );
};
