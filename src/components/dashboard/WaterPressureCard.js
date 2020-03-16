import React from "react";

class WaterPressureCard extends React.Component {
  render() {
    return (
      <div className="dashboard-card" style={{ height: 200 }}>
        <div className="dashboard-card__header">WATER PRESSURE</div>

        <div className="dashboard-card__body text-center pb-3">
          <span className="dashboard-card__value color-yellow">
            {this.props.sensor.pressure}
          </span>
          <br />
          <span className="secondary">Bar</span>
        </div>
      </div>
    );
  }
}

export default WaterPressureCard;
