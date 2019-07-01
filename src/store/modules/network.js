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

import CreateReducer from '../utils/createReducer'
import CreateActions from '../utils/createActions'

const prefix = 'network'
const initialState = {
  loading: {},
  errors: {},
}

const reducers = {
  setLoading: (state, action) => {
    const {
      name,
      value,
    } = action.payload
    state.loading[name] = value
  },
  startLoading: (state, action) => {
    state.loading[action.payload] = true
  },
  stopLoading: (state, action) => {
    state.loading[action.payload] = false
  },
  setError: (state, action) => {
    const {
      name,
      value,
    } = action.payload
    state.errors[name] = value
  },
  clearError: (state, action) => {
    state.errors[action.payload] = null
  },
}

const reducer = CreateReducer({
  initialState,
  reducers,
  prefix,
})

const actions = CreateActions({
  reducers,
  prefix,
})

export { actions, reducer }
export default actions