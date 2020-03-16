import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TemperatureCard from "../components/dashboard/TemperatureCard";
import Scheduler from "../components/dashboard/Scheduler";
import WaterPressureCard from "../components/dashboard/WaterPressureCard";
import SunlightCard from "../components/dashboard/SunlightCard";
import SurfaceAngleCard from "../components/dashboard/SurfaceAngleCard";
import EnergyConsumptionCard from "../components/dashboard/EnergyConsumptionCard";
import WaterConsumptionCard from "../components/dashboard/WaterConsumptionCard";
import LocationCard from "../components/dashboard/LocationCard";
import { GetSensors, SubscribeSensor, selectSensor } from "../api/Sensors";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subscriber: () => {}
    };
  }
  async componentDidMount() {
    const { GetSensors } = this.props;
    const sensors = await GetSensors();
    if (sensors && sensors.length > 0) {
      this.props.selectSensor(sensors[0]);
    }
  }

  componentDidUpdate(prevProps) {
    const { sensor, SubscribeSensor } = this.props;
    if (prevProps.sensor.currentSensor.id !== sensor.currentSensor.id) {
      this.state.subscriber();
      const subscriber = SubscribeSensor(sensor.currentSensor.id);
      this.setState({ subscriber });
    }
  }

  componentWillUnmount() {
    // finish subscribe
    this.state.subscriber();
  }

  render() {
    const { currentSensor } = this.props.sensor;
    return (
      <div className="h-100">
        <div className="dashboard-wrapper">
          <div className="dashboard-content">
            <div className="row header-center-text">
              <h3>
                {currentSensor.deviceId} : {currentSensor.deviceType}
              </h3>
            </div>
            <div className="row">
              <div className="col-4">
                <TemperatureCard sensor={currentSensor} />
              </div>
              <div className="col-8">
                <Scheduler sensor={currentSensor} />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <WaterPressureCard sensor={currentSensor} />
              </div>
              <div className="col-4">
                <SunlightCard sensor={currentSensor} />
              </div>
              <div className="col-4">
                <SurfaceAngleCard sensor={currentSensor} />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <EnergyConsumptionCard sensor={currentSensor} />
              </div>
              <div className="col-6">
                <WaterConsumptionCard sensor={currentSensor} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <LocationCard sensor={currentSensor} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      GetSensors,
      SubscribeSensor,
      selectSensor
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
