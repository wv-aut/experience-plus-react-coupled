import 'babel-polyfill'
import 'whatwg-fetch'
import React from 'react'
import ReactDOM from 'react-dom'
import datalayerInit from './store/datalayer'
import createStore from './store/createStore'
import App from './App'
// import fetchApiKeyifNeeded from './store/auth'

// ========================================================
// Store Instantiation
// ========================================================
export const initialState = Object.assign(window.___INITIAL_STATE__, { initLocation: 'schritt/1/2/spendenbestaetigung' })

// export const initialState = datalayerInit

const store = createStore(initialState)

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  // const routes = require('./routes/index').createRoutes(store)

  ReactDOM.render(
    <App store={store} />,
    MOUNT_NODE
  )
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// ========================================================
// Go!
// ========================================================
render()
