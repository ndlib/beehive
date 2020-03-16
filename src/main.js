import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './assets/css/main.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import getRoutes from './routes/routes.js'
import beehiveTheme from './themes/beehive'
const routes = getRoutes()

ReactDOM.render(
  <ThemeProvider theme={beehiveTheme}>
    {routes}
  </ThemeProvider>,
  document.getElementById('content'),
)
