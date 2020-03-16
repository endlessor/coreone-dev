// tslint:disable
// this is an auto generated file. This will be overwritten

export const onUpdateSensor = /* GraphQL */ `
  subscription OnUpdateSensor($id: ID!) {
    onUpdateSensor(id: $id) {
      id
      deviceId
      deviceType
      temperature
      state
      pressure
      flow
      energy
      uv
      longitude
      latitude
      timestamp
    }
  }
`;
export const onUpdateSensors = /* GraphQL */ `
  subscription OnUpdateSensors {
    onUpdateSensors {
      id
      deviceId
      deviceType
      temperature
      state
      pressure
      flow
      energy
      uv
      longitude
      latitude
      timestamp
    }
  }
`;
