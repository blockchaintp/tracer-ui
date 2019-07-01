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

import React from 'react'
import ErrorBoundary from 'components/system/ErrorBoundary'

import RouteContext from './RouteContext'

const MATCH_ROUTE_HANDLERS = {
  exact: (route, segment) => route == segment,
  startsWith: (route, segment) => route.indexOf(segment) == 0,
}

const stripRoute = (route, segment) => {
  if(!route) return ''
  const routeParts = route.split('.')
  const segmentParts = segment.split('.')
  return routeParts.slice(segmentParts.length).join('.')
}

class Route extends React.Component {

  /*
  
    get a route based on if the current route matches the given segment
    if the route matches, return the Component wrapped in an Error Boundary
    otherwise return null

     * segment - the segment to match (e.g. content.books)
     * exact - how to match the segment, possible values:
       * true - must match exactly (default)
       * false - the route starts with the segment
     * default - if true, render if there is no route present
     * 
  */

  doesMatch() {
    const {
      segment,
      exact,
    } = this.props

    const route = this.context

    if(this.props.default && !route) return true

    const handler = exact ? MATCH_ROUTE_HANDLERS.exact : MATCH_ROUTE_HANDLERS.startsWith

    return handler(route, segment)
  }

  render() {
    const {
      segment,
      exact,
      children,
    } = this.props

    const route = this.context

    if(!this.doesMatch()) return null

    const newRoute = exact ? '' : stripRoute(route, segment)

    return (
      <RouteContext.Provider value={ newRoute }>
        <ErrorBoundary>
          { children }
        </ErrorBoundary>
      </RouteContext.Provider>
    )
  }
}

Route.contextType = RouteContext

export default Route