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

const prefix = 'snackbar'
const initialState = {
  open: false,
  text: '',
  type: 'default',
}

const setText = (state, text, type) => {
  state.open = true
  state.text = text
  state.type = type
}

const reducers = {
  setMessage: (state, action) => setText(state, action.payload, 'default'),
  setSuccess: (state, action) => setText(state, action.payload, 'success'),
  setWarning: (state, action) => setText(state, action.payload, 'warning'),
  setError: (state, action) => setText(state, action.payload, 'error'),
  setInfo: (state, action) => setText(state, action.payload, 'info'),
  onClose: (state, action) => {
    state.open = false
  }
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