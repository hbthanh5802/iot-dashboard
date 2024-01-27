const TestRoutes = require('./test.routes');

function useRoutes(app) {
  app.use(TestRoutes);
}

module.exports = useRoutes;
