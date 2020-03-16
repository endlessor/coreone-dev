import Amplify, { API, graphqlOperation } from "aws-amplify";
import { listSensors } from "../graphql/queries";
import { onUpdateSensor } from "../graphql/subscriptions";
import { ListSensorsQuery } from "../API";
import aws_exports from "../aws-exports";

Amplify.configure(aws_exports);

export interface ISensor {
  id: string;
  deviceId: string;
  deviceType: string;
  temperature: number;
  state: boolean;
  pressure: number;
  flow: number;
  energy: number;
  uv: number;
  longitude: number;
  latitude: number;
  timestamp: number;
}

export const GetSensorStatusColor = (status: boolean) => {
  let r = "";
  if (status) {
    r = "green";
  } else {
    r = "red";
  }

  return r;
};

export const selectSensor = (sensor: ISensor) => {
  return (dispatch: any) => {
    dispatch({ type: "UPDATE_SENSOR", currentSensor: sensor });
  };
};

export const GetSensors = () => {
  return async (dispatch: any) => {
    try {
      const response = (await API.graphql(graphqlOperation(listSensors))) as {
        data: ListSensorsQuery;
      };
      if (response.data.listSensors && response.data.listSensors.items) {
        let r = response.data.listSensors.items as Array<ISensor>;
        r = r.sort((a, b) => {
          if (a.id > b.id) return 1
          if (a.id < b.id) return -1
          return 0
        })
        dispatch({ type: "GET_SENSORS_LIST", getSensorsList: r });
        return r;
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const SubscribeSensor = (id: string) => {
  return (dispatch: any) => {
    const subscriber = API.graphql(
      graphqlOperation(onUpdateSensor, { id: id })
    ).subscribe({
      next: (response: any) => {
        const sensor = response.value.data.onUpdateSensor
        if (sensor.id === id) {
          dispatch({
            type: "UPDATE_SENSOR",
            currentSensor: sensor
          });
        }
      },
      error: (error: any) => {
        console.log("error on sensor subscription", error);
      }
    });

    return () => {
      console.log("terminating subscription to sensor", id);
      subscriber.unsubscribe();
    };
  };
};
