import sendRequest from '@/utils/httpRequest';
const deviceServices = {};

deviceServices.updateDeviceStatus = async ({ method, token, data, params, path }) => {
  let response;
  try {
    response = await sendRequest({
      method: 'PUT',
      data,
      token,
      path: `/device/update-status${path ? '/' + path : ''}`,
      params,
    });
  } catch (error) {
    console.log('Server Error');
    throw error;
  }
  return response;
};

deviceServices.getDevice = async ({ method, token, data, params, path }) => {
  let response;
  try {
    response = await sendRequest({ method: 'GET', data, token, path: `/device${path ? '/' + path : ''}`, params });
  } catch (error) {
    console.log(error);
  }
  return response;
};

deviceServices.getAllDevices = async ({ method, token, data, params, path }) => {
  let response;
  try {
    response = await sendRequest({ method: 'GET', data, token, path: `/device${path ? '/' + path : ''}`, params });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default deviceServices;
