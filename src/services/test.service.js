// import models
const TestServices = {};

TestServices.getFisrtRequest = async (payload) => {
  const { title } = payload;
  const res = {
    statusCode: 201,
    message: 'First response from TestServices',
    data: {},
  };
  try {
    res.data = { title };
  } catch (error) {
    console.log(error);
    res.statasCode = 500;
  }
  return res;
};

module.exports = TestServices;
