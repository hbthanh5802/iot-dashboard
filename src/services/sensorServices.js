import sendRequest from '@/utils/httpRequest';
const sensorServices = {};

sensorServices.getSensorData = async ({ method, token, data, params }) => {
  let response;
  try {
    response = await sendRequest({ method: 'GET', data, token, path: '/sensor', params });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default sensorServices;
