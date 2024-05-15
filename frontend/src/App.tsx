import React from "react";
import store from './store';
import { Provider } from 'react-redux';
import { HomePage } from "./components/HomePage/HomePage";

function App() {
  return (
    <>
      <Provider store={store}>
        <HomePage />
      </Provider>
    </>
  );
}

export default App;
