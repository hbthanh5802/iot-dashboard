import sendRequest from '@/utils/httpRequest';
const deviceServices = {};

deviceServices.updateDevice = async ({ method, token, data, params }) => {
  let response;
  try {
    response = await sendRequest({ method: 'PUT', data, token, path: '/device/update', params });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default deviceServices;
