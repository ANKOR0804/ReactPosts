import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Error from '../pages/Error';
import {routes} from '../router/router';

const AppRouter = () => {
  return (
    <Routes>
      {routes.map(route =>
        <Route
          key={route.element}
          element={route.element}
          path={route.path}
        />
      )}
      <Route
        path="*"
        element={<Error/>}
      />
    </Routes>
  );
};

export default AppRouter;