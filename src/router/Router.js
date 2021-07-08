import React, { Suspense, lazy } from 'react'
import { connect } from 'react-redux'

import selectors from 'store/selectors'
import Loading from 'components/system/Loading'

import LayoutMain from 'containers/Layout'

import NotFound from 'containers/NotFound'
import HomePage from 'containers/Home'
import Route from './Route'
import RouteContext from './RouteContext'

@connect(
  (state) => ({
    route: selectors.router.route(state),
  }),
  {

  },
)
class Router extends React.Component {
  render() {
    const {
      route,
    } = this.props

    if (!route) return <Loading />

    return (
      <RouteContext.Provider value={route.name}>
        <LayoutMain>
          <Route segment="notfound" exact>
            <NotFound />
          </Route>
          <Route segment="home" exact>
            <HomePage />
          </Route>
        </LayoutMain>
      </RouteContext.Provider>
    )
  }
}

export default Router
