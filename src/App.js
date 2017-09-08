import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CoreLayout from './layouts/CoreLayout/CoreLayout'
import Home from './routes/Home'
import Profile from './routes/Profile'
import { TAX_RECEIPT_PROFILE_ROUTE } from './routes/config/routes.config'

import Auth from './components/Auth/containers/AuthContainer'

class App extends Component {
  static propTypes = {
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { store } = this.props
    return (
      <Provider store={store}>
        <div style={{ height: '100%' }} id='css-root'>
          <Auth />
          <BrowserRouter>
          <div>
            <Route path='/' component={CoreLayout} />

            const CoreLayout = () => (
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path={TAX_RECEIPT_PROFILE_ROUTE} component={Profile} />
              </Switch>
            )
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    )
  }
}

export default App
