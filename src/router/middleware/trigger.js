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


const runTriggers = ({
  routes,
  params,
  store,
  propName,
}) => {
  const allTriggers = routes.reduce((all, route) => {
    let triggers = route.trigger || {}
    const toRun = triggers[propName]
    if(!toRun) return all
    if(typeof(toRun) === 'function') triggers = [toRun]
    return all.concat(toRun)
  }, [])
  allTriggers.forEach(trigger => trigger(store, params))
}

/*

  trigger actions when routes become active

*/
const triggerRoute = (routes) => (router, dependencies) => (toState, fromState, done) => {

  const { toActivate, toDeactivate } = transitionPath(toState, fromState)
  const { store } = dependencies
  const params = toState.params

  const activeRoutes = findRoutes(routes, toActivate)
  const deactiveRoutes = findRoutes(routes, toDeactivate)

  runTriggers({
    routes: activeRoutes,
    params,
    store,
    propName: 'activate',
  })

  runTriggers({
    routes: deactiveRoutes,
    params,
    store,
    propName: 'deactivate',
  })

  done()
}

export default triggerRoute