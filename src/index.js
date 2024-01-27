const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Routes
const useRoutes = require('./routes/index');
useRoutes(app);

// Đồng bộ hóa mô hình với cơ sở dữ liệu
const PORT = process.env.PORT || 4005;
const sequelize = require('./configs/database');
const TestModel = require('./models/Test.model');
const OtherModel = require('./models/Other.model');

TestModel.hasOne(OtherModel);
OtherModel.belongsTo(TestModel);

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Database synchronized.');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error synchronizing database:', err);
  });
