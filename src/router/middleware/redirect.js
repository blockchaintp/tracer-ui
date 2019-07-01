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

import transitionPath from 'router5-transition-path'
import findRoutes from '../utils/findRoutes'

import routerActions from 'store/modules/router'

/*

  if the active route has a redirect property - redirect there

*/
const redirectRoute = (routes) => (router, dependencies) => (toState, fromState, done) => {
  const { toActivate } = transitionPath(toState, fromState)
  const { store } = dependencies

  const activeRoutes = findRoutes(routes, toActivate)
  const activeRoute = activeRoutes[activeRoutes.length-1]

  if(!activeRoute) return done()

  const redirectInfo = activeRoute.redirect

  if(!redirectInfo) return done()

  let redirectTo = null

  // if the redirect is a string - redirect there
  if(typeof(redirectInfo) === 'string') {
    redirectTo = redirectInfo
  }
  // if it's a function - run the function passing the redux state
  // the function should return the redirect or falsey value for don't redirect
  else if(typeof(redirectInfo) === 'function') {
    redirectTo = redirectInfo(store.getState())
  }
  else {
    return done(`unknown type of redirect info: ${typeof(redirectInfo)}`)
  }

  if(redirectTo && redirectTo != activeRoute.name) {
    store.dispatch(routerActions.navigateTo(redirectTo)) 
  }
  else {
    done()
  }
}

export default redirectRoute