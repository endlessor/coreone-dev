import React from "react";

class SurfaceAngleCard extends React.Component {
  render() {
    return (
      <div className="dashboard-card" style={{ height: 200 }}>
        <div className="dashboard-card__header">SURFACE ANGLE</div>

        <div className="dashboard-card__body text-center pb-3">
          <span className="dashboard-card__value">
            {this.props.sensor.uv}
          </span>
          <br />
          <span className="secondary">Degrees</span>
        </div>
      </div>
    );
  }
}

export default SurfaceAngleCard;
