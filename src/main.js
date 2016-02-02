import "./assets/css/main.scss";

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import React from 'react';
import ReactDOM from 'react-dom';
import getRoutes from './routes/routes.js';

const routes = getRoutes();

ReactDOM.render(
  <div>
    {routes}
  </div>,
  document.getElementById('content')
);
