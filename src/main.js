import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './assets/css/main.scss'
import ReactDOM from 'react-dom'
import getRoutes from './routes/routes.js'
const routes = getRoutes()

ReactDOM.render(
  routes,
  document.getElementById('content'),
)
