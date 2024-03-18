import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DefaultLayout } from '@/layouts';
import { publicRoutes } from '@/routes';

function App() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  // const location = window.location.pathname;
  // console.log(location);

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <div
        className="App"
        style={{
          height: `${windowHeight}px`,
        }}
      >
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            const Page = route.component;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
