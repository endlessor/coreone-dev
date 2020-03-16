import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const marks = {
  65: <strong className="slider-mark mark-top">65&nbsp;°</strong>,
  5: <strong className="slider-mark mark-bottom">5&nbsp;°</strong>
};

class TemperatureCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayedTemp: 5,
      currentTemp: 5,
      color: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sensor.temperature !== this.props.sensor.temperature) {
      const temp = this.props.sensor.temperature;
      this.setState({
        currentTemp: parseInt(temp),
        displayedTemp: temp,
        color: this.getValueColor(temp)
      });
    }
  }

  onSetTemperatureChange = value => {
    this.setState({
      displayedTemp: value,
      currentTemp: parseInt(value),
      color: this.getValueColor(value)
    });
  };

  getValueColor = value => {
    let color = "#eb5e54";
    if (value >= 5 && value <= 20) {
      color = "#4f82e9";
    } else if (value > 20 && value <= 35) {
      color = "#f8d700";
    } else if (value > 35 && value <= 50) {
      color = "eb5e54";
    } else {
      color = "#eb5e54";
    }

    return color;
  };

  displayedTemperature = () => {
    let temp = this.state.displayedTemp.toString(),
      digit1 = temp.slice(0, 1),
      digit2 = temp.slice(1),
      long = temp.length > 1;
    return (
      <span className="mr-1">
        <span className="digit">{long ? digit1 : " "}</span>
        <span className="digit">{long ? digit2 : digit1}</span>
      </span>
    );
  };

  render() {
    return (
      <div className="dashboard-card temperature-card" style={{ height: 500 }}>
        <div className="dashboard-card__header">TEMPERATURE</div>

        <div className="dashboard-card__body">
          <span
            className={"dashboard-card__value set-value"}
            style={{ color: this.state.color }}
          >
            {this.displayedTemperature()}
            {"°"}
          </span>
          <br />
          <span className="current-temperature">Celcius</span>
        </div>

        <div className="slider-wrapper">
          <Slider
            min={5}
            max={65}
            step={1}
            vertical
            value={this.state.currentTemp}
            onChange={this.onSetTemperatureChange}
            marks={marks}
            dotStyle={{ display: "none" }}
            handleStyle={{
              marginLeft: -5,
              border: "1px solid #eee",
              boxShadow: "none",
              width: 15,
              height: 15
            }}
          />
        </div>
      </div>
    );
  }
}

export default TemperatureCard;
