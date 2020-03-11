import './assets/css/main.scss'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from './routes/routes.js'
const routes = getRoutes()

ReactDOM.render(
  <MuiThemeProvider>
    {routes}
  </MuiThemeProvider>,
  document.getElementById('content')
)
