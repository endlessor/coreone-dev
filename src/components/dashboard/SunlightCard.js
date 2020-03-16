import React from "react";

class SunlightCard extends React.Component {
  render() {
    return (
      <div className="dashboard-card" style={{ height: 200 }}>
        <div className="dashboard-card__header">SUNLIGHT</div>

        <div className="dashboard-card__body text-center pb-3">
          <span className="dashboard-card__value color-yellow">
            {this.props.sensor.uv}
          </span>
          <br />
          <span className="secondary">&nbsp;</span>
        </div>
      </div>
    );
  }
}

export default SunlightCard;
