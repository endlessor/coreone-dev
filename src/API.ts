/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateSensorInput = {
  id?: string | null,
  deviceId: string,
  deviceType: string,
  temperature: number,
  state: boolean,
  pressure: number,
  flow: number,
  energy: number,
  uv: number,
  longitude: number,
  latitude: number,
  timestamp: number,
};

export type ModelSensorConditionInput = {
  deviceId?: ModelStringInput | null,
  deviceType?: ModelStringInput | null,
  temperature?: ModelFloatInput | null,
  state?: ModelBooleanInput | null,
  pressure?: ModelFloatInput | null,
  flow?: ModelFloatInput | null,
  energy?: ModelFloatInput | null,
  uv?: ModelFloatInput | null,
  longitude?: ModelFloatInput | null,
  latitude?: ModelFloatInput | null,
  timestamp?: ModelIntInput | null,
  and?: Array< ModelSensorConditionInput | null > | null,
  or?: Array< ModelSensorConditionInput | null > | null,
  not?: ModelSensorConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateSensorInput = {
  id: string,
  deviceId?: string | null,
  deviceType?: string | null,
  temperature?: number | null,
  state?: boolean | null,
  pressure?: number | null,
  flow?: number | null,
  energy?: number | null,
  uv?: number | null,
  longitude?: number | null,
  latitude?: number | null,
  timestamp?: number | null,
};

export type DeleteSensorInput = {
  id?: string | null,
};

export type ModelSensorFilterInput = {
  id?: ModelIDInput | null,
  deviceId?: ModelStringInput | null,
  deviceType?: ModelStringInput | null,
  temperature?: ModelFloatInput | null,
  state?: ModelBooleanInput | null,
  pressure?: ModelFloatInput | null,
  flow?: ModelFloatInput | null,
  energy?: ModelFloatInput | null,
  uv?: ModelFloatInput | null,
  longitude?: ModelFloatInput | null,
  latitude?: ModelFloatInput | null,
  timestamp?: ModelIntInput | null,
  and?: Array< ModelSensorFilterInput | null > | null,
  or?: Array< ModelSensorFilterInput | null > | null,
  not?: ModelSensorFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type CreateSensorMutationVariables = {
  input: CreateSensorInput,
  condition?: ModelSensorConditionInput | null,
};

export type CreateSensorMutation = {
  createSensor:  {
    __typename: "Sensor",
    id: string,
    deviceId: string,
    deviceType: string,
    temperature: number,
    state: boolean,
    pressure: number,
    flow: number,
    energy: number,
    uv: number,
    longitude: number,
    latitude: number,
    timestamp: number,
  } | null,
};

export type UpdateSensorMutationVariables = {
  input: UpdateSensorInput,
  condition?: ModelSensorConditionInput | null,
};

export type UpdateSensorMutation = {
  updateSensor:  {
    __typename: "Sensor",
    id: string,
    deviceId: string,
    deviceType: string,
    temperature: number,
    state: boolean,
    pressure: number,
    flow: number,
    energy: number,
    uv: number,
    longitude: number,
    latitude: number,
    timestamp: number,
  } | null,
};

export type DeleteSensorMutationVariables = {
  input: DeleteSensorInput,
  condition?: ModelSensorConditionInput | null,
};

export type DeleteSensorMutation = {
  deleteSensor:  {
    __typename: "Sensor",
    id: string,
    deviceId: string,
    deviceType: string,
    temperature: number,
    state: boolean,
    pressure: number,
    flow: number,
    energy: number,
    uv: number,
    longitude: number,
    latitude: number,
    timestamp: number,
  } | null,
};

export type GetSensorQueryVariables = {
  id: string,
};

export type GetSensorQuery = {
  getSensor:  {
    __typename: "Sensor",
    id: string,
    deviceId: string,
    deviceType: string,
    temperature: number,
    state: boolean,
    pressure: number,
    flow: number,
    energy: number,
    uv: number,
    longitude: number,
    latitude: number,
    timestamp: number,
  } | null,
};

export type ListSensorsQueryVariables = {
  filter?: ModelSensorFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSensorsQuery = {
  listSensors:  {
    __typename: "ModelSensorConnection",
    items:  Array< {
      __typename: "Sensor",
      id: string,
      deviceId: string,
      deviceType: string,
      temperature: number,
      state: boolean,
      pressure: number,
      flow: number,
      energy: number,
      uv: number,
      longitude: number,
      latitude: number,
      timestamp: number,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnUpdateSensorSubscriptionVariables = {
  id: string,
};

export type OnUpdateSensorSubscription = {
  onUpdateSensor:  {
    __typename: "Sensor",
    id: string,
    deviceId: string,
    deviceType: string,
    temperature: number,
    state: boolean,
    pressure: number,
    flow: number,
    energy: number,
    uv: number,
    longitude: number,
    latitude: number,
    timestamp: number,
  } | null,
};

export type OnUpdateSensorsSubscription = {
  onUpdateSensors:  {
    __typename: "Sensor",
    id: string,
    deviceId: string,
    deviceType: string,
    temperature: number,
    state: boolean,
    pressure: number,
    flow: number,
    energy: number,
    uv: number,
    longitude: number,
    latitude: number,
    timestamp: number,
  } | null,
};
