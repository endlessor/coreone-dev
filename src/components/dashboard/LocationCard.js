import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

class LocationCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hideMap: false
    };
  }

  componentDidUpdate(prevProps) {
    const { sensor } = this.props;
    if (prevProps.sensor.id !== sensor.id) {
      this.setState({ hideMap: true });
      setTimeout(() => this.setState({ hideMap: false }), 500);
    }
  }

  render() {
    const iniCenter = {
      lat: this.props.sensor.latitude || 0,
      lng: this.props.sensor.longitude || 0
    };
    return (
      <div className="dashboard-card location-card" style={{ height: 500 }}>
        {!this.state.hideMap && (
          <Map google={this.props.google} initialCenter={iniCenter} zoom={10}>
            <Marker name={"Current location"} />
          </Map>
        )}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBITo3xw80bOFRd2vvdd94CqwR-HM99yGg"
})(LocationCard);
