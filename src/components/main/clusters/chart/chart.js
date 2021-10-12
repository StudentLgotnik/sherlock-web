import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
import styles from "./chart.module.css"

class Chart extends Component {

  getRandomColor() {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    return [`rgba(${r}, ${g}, ${b}, 0.2)`, `rgba(${r}, ${g}, ${b}, 1)`];
  }

  render() {
    const clusters = this.props.sherlockDto.clusters;
    let labels = []
    let testCaseNumbers = []
    let bgColors = []
    let bColors = []
    clusters.map(cluster => {
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
          label: `${this.props.sherlockDto.runName}`,
          data: testCaseNumbers,
          backgroundColor: bgColors,
          borderColor: bColors,
          borderWidth: 1,
        },
      ],
    };
    return (
      <div className={styles.chartView}>
        <Doughnut data={data}/>
      </div>
    );
  }
}

export default Chart;
