import sendRequest from '@/utils/httpRequest';
const mqttServices = {};

mqttServices.getStatus = async ({ token, data, params, path, allowLog }) => {
  let response;
  try {
    response = await sendRequest({ method: 'GET', path: '/mqtt/status', allowLog });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default mqttServices;
