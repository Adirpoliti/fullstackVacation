import React from "react";
import store from './components/redux/store';
import { Provider } from 'react-redux';
import { RouterProvider } from "react-router-dom";
import router from "./components/routes/Router";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
