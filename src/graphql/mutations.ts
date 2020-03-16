// tslint:disable
// this is an auto generated file. This will be overwritten

export const createSensor = /* GraphQL */ `
  mutation CreateSensor(
    $input: CreateSensorInput!
    $condition: ModelSensorConditionInput
  ) {
    createSensor(input: $input, condition: $condition) {
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
export const updateSensor = /* GraphQL */ `
  mutation UpdateSensor(
    $input: UpdateSensorInput!
    $condition: ModelSensorConditionInput
  ) {
    updateSensor(input: $input, condition: $condition) {
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
export const deleteSensor = /* GraphQL */ `
  mutation DeleteSensor(
    $input: DeleteSensorInput!
    $condition: ModelSensorConditionInput
  ) {
    deleteSensor(input: $input, condition: $condition) {
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
