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
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router5'

import Theme from './theme'
import SnackbarWrapper from './containers/SnackbarWrapper'
import Router from './router/Router'

class Root extends React.Component {
  render() {

    const {
      store,
      router,
    } = this.props

    return (
      <Provider store={ store }>
        <Theme>
          <SnackbarWrapper>
            <RouterProvider router={ router }>
              <Router/>
            </RouterProvider>
          </SnackbarWrapper>
        </Theme>
      </Provider>
    )
  }
}

export default Root
