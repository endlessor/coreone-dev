import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import MaterialIcon from "material-icons-react";
import { MAIN_COLOR } from "../utils";

const marks = {
  65: <strong className="slider-mark mark-top">65&nbsp;°C</strong>,
  5: <strong className="slider-mark mark-bottom">0&nbsp;°C</strong>
};
class Temperature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 39,
      color: MAIN_COLOR,
      status: true,
      blinking: false
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  onValueChange(value) {
    let color = "#eb5e54";
    if (value >= 5 && value <= 20) {
      color = "#4f82e9";
    } else if (value > 20 && value <= 35) {
      color = "#f8d700";
    } else if (value > 35 && value <= 50) {
      color = MAIN_COLOR;
    } else {
      color = "#eb5e54";
    }

    color = MAIN_COLOR;
    this.setState({ value: parseInt(value), color, blinking: true });

    setTimeout(
      () => this.setState({ value: 38, blinking: false, color: MAIN_COLOR }),
      3000
    );
  }

  toggle() {
    this.setState({ status: !this.state.status });
  }

  render() {
    return (
      <div className="App">
        <div className="header" style={{ display: "none" }}>
          <div className="title">Temperature</div>
        </div>

        <div className="content-wrapper">
          <span
            className={`set-value ${
              this.state.blinking && this.state.status ? "blink" : ""
            }`}
            style={{
              color: this.state.status ? this.state.color : "#ccc",
              marginLeft: this.state.status ? 40 : 0
            }}
          >
            {this.state.status ? this.state.value + "°" : "Off"}
          </span>

          <br />

          <span
            style={{ opacity: this.state.status ? 0 : 1 }}
            className="current-temperature"
          >
            Current: 38°
          </span>

          <br />

          <div
            onClick={this.toggle}
            className="toggle-btn"
            style={{
              display: "none",
              backgroundColor: this.state.status ? "#ccc" : MAIN_COLOR
            }}
          >
            <MaterialIcon icon="power_settings_new" />
          </div>
        </div>

        {this.state.status && (
          <div className="slider-wrapper">
            <Slider
              min={5}
              max={65}
              step={1}
              vertical
              value={this.state.value}
              onChange={this.onValueChange}
              trackStyle={{ background: MAIN_COLOR }}
              marks={marks}
              dotStyle={{ display: "none" }}
              handleStyle={{
                marginLeft: -10,
                border: "1px solid #eee",
                boxShadow: "none",
                width: 25,
                height: 25
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Temperature;
