/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiIotdashboardGraphQLAPIIdOutput = process.env.API_IOTDASHBOARD_GRAPHQLAPIIDOUTPUT
var apiIotdashboardGraphQLAPIEndpointOutput = process.env.API_IOTDASHBOARD_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const appsync = require('aws-appsync');
const gql = require('graphql-tag');
require('cross-fetch/polyfill');

const region = process.env.REGION
const apiIotdashboardGraphQLAPIEndpointOutput = process.env.API_IOTDASHBOARD_GRAPHQLAPIENDPOINTOUTPUT

AWS.config.update({
    region: region
});

const credentials = AWS.config.credentials;

exports.handler = async (event) => {

    console.log('event received:' + JSON.stringify(event));
    
    //create appsync client - using IAM permissions
    const graphqlClient = new appsync.AWSAppSyncClient({
        url: apiIotdashboardGraphQLAPIEndpointOutput,
        region: region,
        auth: {
          type: 'AWS_IAM',
          credentials: credentials
        },
        disableOffline: true
    });

    //define the graphql mutation to update the sensor
    const mutation = gql`mutation UpdateSensor(
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
      }`;

    //set the status based on the current value
    let state = false;

    if (event.data.temperature < 9) {
      state = true;
    }

    //execute the mutation
    try {

      var r = await graphqlClient.mutate({
        mutation,
        variables: {input: {
          id: event.id,
          deviceId: event.data.deviceID,
          deviceType: event.data.deviceType,
          temperature: event.data.temperature,
          state: state,
          pressure: event.data.pressure,
          flow: event.data.flow,
          energy: event.data.energy,
          uv: event.data.uv,
          longitude: event.data.longitude,
          latitude: event.data.latitude,
          timestamp: event.data.timestamp
        }}
      });

      const response = {
        statusCode: 200,
        body: JSON.stringify({ message: 'Success', data: r })
      }
    
      return response
    }
    catch (err) {

      const response = {
        statusCode: 400,
        body: JSON.stringify({ message: err.message })
      }

      return response
    }
}

