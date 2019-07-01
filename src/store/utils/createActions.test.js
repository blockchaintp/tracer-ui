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
import createActions from './createActions'

tape('createActions -> standard', (t) => {
  const actions = createActions({
    reducers: {
      toggleOpen: (state, action) => {
        state.open = action.payload
      },
      setData: (state, action) => {
        state.data = action.payload
      }
    }
  })
  t.deepEqual(actions.toggleOpen(true), {
    type: 'toggleOpen',
    payload: true,
  }, `the toggleOpen action is correct`)
  t.deepEqual(actions.setData(10), {
    type: 'setData',
    payload: 10,
  }, `the setData action is correct`)
  t.end()
})

tape('createActions -> with prefix', (t) => {
  const actions = createActions({
    prefix: 'apples',
    reducers: {
      toggleOpen: (state, action) => {
        state.open = action.payload
      },
      setData: (state, action) => {
        state.data = action.payload
      }
    }
  })
  t.deepEqual(actions.toggleOpen(true), {
    type: 'apples/toggleOpen',
    payload: true,
  }, `the toggleOpen action is correct`)
  t.deepEqual(actions.setData(10), {
    type: 'apples/setData',
    payload: 10,
  }, `the setData action is correct`)
  t.end()
})
