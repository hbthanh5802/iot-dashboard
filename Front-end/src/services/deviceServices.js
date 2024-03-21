import sendRequest from '@/utils/httpRequest';
const deviceServices = {};

deviceServices.updateDeviceStatus = async ({ method, token, data, params, path, allowLog }) => {
  let response;
  try {
    response = await sendRequest({
      method: 'PUT',
      data,
      token,
      path: `/device/update-status${path ? '/' + path : ''}`,
      params,
      allowLog,
    });
  } catch (error) {
    console.log('Server Error');
    throw error;
  }
  return response;
};

deviceServices.getDevice = async ({ method, token, data, params, path, allowLog }) => {
  let response;
  try {
    response = await sendRequest({
      method: 'GET',
      data,
      token,
      path: `/device${path ? '/' + path : ''}`,
      params,
      allowLog,
    });
  } catch (error) {
    console.log(error);
  }
  return response;
};

deviceServices.getAllDevices = async ({ method, token, data, params, path, allowLog }) => {
  let response;
  try {
    response = await sendRequest({
      method: 'GET',
      data,
      token,
      path: `/device${path ? '/' + path : ''}`,
      params,
      allowLog,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

deviceServices.getDataAction = async ({ method, token, data, params, path, allowLog }) => {
  let response;
  try {
    response = await sendRequest({ method: 'GET', data, token, path: '/device/action', params, allowLog });
    return response;
  } catch (error) {
    console.log(error);
  }
};

deviceServices.deleteActionData = async ({ method, token, data, params, path, allowLog }) => {
  let response;
  try {
    response = await sendRequest({
      method: 'DELETE',
      data,
      token,
      path: `/device/action/delete`,
      params,
      allowLog,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default deviceServices;
