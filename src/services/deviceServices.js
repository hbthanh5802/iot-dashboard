import httpRequest from '@/utils/httpRequest';

export const getDevice = async (path) => {
  try {
    const { data } = await httpRequest.get(path);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateDevice = async (path, payload) => {
  try {
    const { data } = await httpRequest.put(path, payload);
    return data;
  } catch (error) {
    console.log(error);
  }
};
