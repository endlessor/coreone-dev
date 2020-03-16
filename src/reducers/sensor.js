const initialUserData = {
  sensors: [],
  currentSensor: {}
};

const sensor = (state = initialUserData, action) => {
  switch (action.type) {
    case "GET_SENSORS_LIST":
      return {
        ...state,
        sensors: action.getSensorsList
      };
    case "UPDATE_SENSOR":
      return {
        ...state,
        currentSensor: action.currentSensor
      }
    default:
      return state;
  }
};

export default sensor;
