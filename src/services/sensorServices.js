import httpRequest from '@/utils/httpRequest';

export const getSensorData = async () => {
  try {
    const { data } = await httpRequest.get('/sensor');
    return data;
  } catch (error) {
    console.log(error);
  }
};
