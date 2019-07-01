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

import createRouter from 'router5'
import browserPlugin from 'router5-plugin-browser'

import routes from './routes'

import logMiddleware from './middleware/log'
import redirectMiddleware from './middleware/redirect'
import triggerMiddleware from './middleware/trigger'

const Router = () => {
  const router = createRouter(routes, {
    defaultRoute: 'notfound',
    queryParamsMode: 'loose',
  })

  router.usePlugin(browserPlugin({}))
  router.useMiddleware(logMiddleware(routes))
  router.useMiddleware(redirectMiddleware(routes))
  router.useMiddleware(triggerMiddleware(routes))

  return router
}

export default Router
