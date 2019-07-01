// Copyright 2019 Blockchain Technology Partners
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ------------------------------------------------------------------------------

import React, { Suspense, lazy } from 'react'
import { connect } from 'react-redux'

import selectors from 'store/selectors'
import Loading from 'components/system/Loading'

import LayoutMain from 'containers/Layout'

import Route from './Route'
import RouteContext from './RouteContext'

import NotFound from 'containers/NotFound'

import HomePage from 'containers/Home'

@connect(
  state => {
    return {
      route: selectors.router.route(state),
    }
  },
  {

  }
)
class Router extends React.Component {

  render() {
    const {
      route,
    } = this.props

    if(!route) return <Loading />

    return (
      <RouteContext.Provider value={ route.name }>
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