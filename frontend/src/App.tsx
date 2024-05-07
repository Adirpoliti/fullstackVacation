import React from "react";
import { Sign } from "./components/pages/SigninUp/Sign";
import store from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <>
      <Provider store={store}>
        <Sign />
      </Provider>
    </>
  );
}

export default App;
