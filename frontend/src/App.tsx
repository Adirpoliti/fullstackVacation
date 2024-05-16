import React from "react";
import { Provider } from 'react-redux';
import { RouterProvider } from "react-router-dom";
import store from "./App/store";
import router from "./routes/Router";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
