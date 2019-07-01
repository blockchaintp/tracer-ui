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

import tape from 'tape'
import createReducer from './createReducer'

const initialState = {
  open: false,
}

const reducers = {
  toggleOpen: (state, action) => {
    state.open = action.payload
  }, 
}

const getReducer = (prefix) => createReducer({
  initialState,
  reducers,
  prefix,
})

tape('createReducer -> initial state', (t) => {
  const reducer = getReducer()
  t.deepEqual(reducer(undefined, {}), initialState, `the initial state is correct`)
  t.end()
})

tape('createReducer -> toggle action', (t) => {
  const reducer = getReducer()
  const newState = reducer(undefined, {
    type: 'toggleOpen',
    payload: true,
  })
  t.deepEqual(newState, {
    open: true,
  }, `the new state is correct`)
  t.end()
})

tape('createReducer -> with prefix', (t) => {
  const reducer = getReducer('apples')
  const newState = reducer(undefined, {
    type: 'apples/toggleOpen',
    payload: true,
  })
  t.deepEqual(newState, {
    open: true,
  }, `the new state is correct`)
  t.end()
})

tape('createReducer -> with no matching action', (t) => {
  const reducer = createReducer({
    initialState: {
      fruit: 10,
    },
    reducers: {
      apples: (state, action) => {
        state.fruit = action.payload
      }
    }
  })

  const newState = reducer(undefined, {
    type: 'oranges',
    payload: 11,
  })
  t.deepEqual(newState, {
    fruit: 10,
  }, `the new state is correct`)
  t.end()
})