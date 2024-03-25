import sendRequest from '@/utils/httpRequest';
const sensorServices = {};

sensorServices.getSensorData = async ({ method, token, data, params, path, allowLog }) => {
  let response;
  try {
    response = await sendRequest({ method: 'GET', data, token, path: '/sensor/data', params, allowLog });
    return response;
  } catch (error) {
    throw error;
  }
};

sensorServices.deleteSensorData = async ({ method, token, data, params, path, allowLog }) => {
  let response;
  try {
    response = await sendRequest({
      method: 'DELETE',
      data,
      token,
      path: `/sensor/data/delete`,
      params,
      allowLog,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export default sensorServices;
