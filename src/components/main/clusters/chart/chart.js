import React, {Component} from 'react';
import { Doughnut } from 'react-chartjs-2';

class Chart extends Component {

  constructor(props) {
    super(props);

    const clusters = props.sherlockDto.clusters;
    let labels =[]
    let testCaseNumbers = []
    let bgColors = []
    let bColors = []
    clusters.map( cluster => {
      labels.push(cluster.name);
      testCaseNumbers.push(cluster.testCases.length)
      const [bgColor, bColor] = this.getRandomColor()
      bgColors.push(bgColor)
      bColors.push(bColor)
    })

    const data = {
      labels: labels,
      datasets: [
        {
          label: `${props.sherlockDto.runName}`,
          data: testCaseNumbers,
          backgroundColor: bgColors,
          borderColor: bColors,
          borderWidth: 1,
        },
      ],
    };
    this.state = {
      clusterData: data
    }
  }

  getRandomColor() {
    const r = Math.round (Math.random () * 255);
    const g = Math.round (Math.random () * 255);
    const b = Math.round (Math.random () * 255);
    return [`rgba(${r}, ${g}, ${b}, 0.2)`, `rgba(${r}, ${g}, ${b}, 1)`];
  }

  render() {
    return (
      <Doughnut data={this.state.clusterData}/>
    );
  }
}

export default Chart;
