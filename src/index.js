import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ProviderWrapper from './Provider';


ReactDOM.render(
  <ProviderWrapper>
    <App />
  </ProviderWrapper>,
 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// This is for initial commit

serviceWorker.unregister();
