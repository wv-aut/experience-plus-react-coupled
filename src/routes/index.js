// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import NotFound from './NotFound/components/NotFound'
import Profile from './Profile'
import Home from './Home'
import TaxReceipt from './Profile/profileElements/TaxReceipt/components/TaxReceipt'
import { TAX_RECEIPT_PROFILE_ROUTE, TAX_RECEIPT_PRINT_ROUTE } from './config/routes.config'


/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [
    { path: TAX_RECEIPT_PROFILE_ROUTE,
      component: Profile,
      childRoutes : [
        { path: TAX_RECEIPT_PRINT_ROUTE,
          component: TaxReceipt,
          store:store
        }
      ]
    },
    { path: '*',
      component: NotFound

    }
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Profile').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
