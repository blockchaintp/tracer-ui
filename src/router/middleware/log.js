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

import settings from 'settings'

// log each route transition in development
const logRoute = (routes) => (router, dependencies) => (toState, fromState, done) => {
  if(!settings.devMode) return done()
  const { toActivate } = transitionPath(toState, fromState)
  const activeRoutes = findRoutes(routes, toActivate)
  console.log(`route:`, activeRoutes)
  done()
}

export default logRoute