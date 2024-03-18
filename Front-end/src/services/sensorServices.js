import sendRequest from '@/utils/httpRequest';
const sensorServices = {};

sensorServices.getSensorData = async ({ method, token, data, params, path }) => {
  let response;
  try {
    response = await sendRequest({ method: 'GET', data, token, path: '/sensor/data', params });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default sensorServices;
