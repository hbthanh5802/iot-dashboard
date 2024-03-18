import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

async function sendRequest({ path, method, token = null, data = null, params = null }) {
  try {
    const configs = {
      method,
      url: path,
      params,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      data,
    };
    console.log('configs', configs);
    const response = await instance.request(configs);
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export default sendRequest;
