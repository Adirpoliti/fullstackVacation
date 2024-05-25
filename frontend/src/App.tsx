import React from "react";
import { Provider } from 'react-redux';
import { RouterProvider } from "react-router-dom";
import store from "./App/store";
import router from "./routes/Router";
import { RefreshProvider } from "./components/RefreshContext";

function App() {
  return (
    <RefreshProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </RefreshProvider>
  );
}

export default App;
