import React from "react";
import { MAIN_COLOR } from "../utils";
import ReactEcharts from "echarts-for-react";

class EnergyConsumptionCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      xAxisData: [],
      data: []
    };
  }

  componentDidUpdate(prevProps) {
    const { xAxisData, data } = this.state;
    const { sensor } = this.props;
    if (prevProps.sensor.energy !== sensor.energy) {
      xAxisData.push(xAxisData.length);
      data.push(sensor.energy);
      this.setState({ xAxisData, data });
    }
    if (prevProps.sensor.id !== sensor.id) {
      this.setState({ xAxisData: [], data: [] });
    }
  }

  render() {
    const { xAxisData, data } = this.state;
    const options = {
      grid: {
        left: 30,
        top: 30,
        right: 15,
        bottom: 30
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false
        }
      },
      yAxis: {
        show: false,
        splitLine: { show: false }
      },
      series: [
        {
          color: MAIN_COLOR,
          name: "bar",
          type: "bar",
          data: data,
          animationDelay: function(idx) {
            return idx * 10;
          }
        }
      ],
      animationEasing: "elasticOut",
      animationDelayUpdate: function(idx) {
        return idx * 5;
      }
    };

    return (
      <div className="dashboard-card" style={{ height: 500 }}>
        <div className="dashboard-card__header">ENERGY CONSUMPTION</div>

        <div className="dashboard-card__body text-center">
          <span className="dashboard-card__value color-main">
            {this.props.sensor.energy}
          </span>
          <br />
          <span className="secondary">kW/Hour</span>
        </div>

        <ReactEcharts
          style={{ height: 350, width: "100%" }}
          option={options}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
    );
  }
}

export default EnergyConsumptionCard;
