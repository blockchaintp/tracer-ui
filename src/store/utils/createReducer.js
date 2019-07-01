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

import createNextState from 'immer'

/*

  createReducer({
    initialState,
    reducers,
  }) => (state, action)

  * initialState    the initialState for this reducer
  * reducers        a map of functions to reduce each action

  {
    initialState: {
      open: false,
    },
    reducers: {
      toggleOpen: (state, action) => {
        state.open = action.payload
      },
    },
  }

  you would emit an action like this:

  {
    type: 'toggleOpen',
    payload: {
      open: true,
    },
  }

*/
const CreateReducer = ({
  initialState,
  reducers,
  prefix,
}) => {
  if(!reducers) throw new Error(`reducers required for CreateReducer`)
  const useReducers = Object.keys(reducers).reduce((all, name) => {
    const key = prefix ? `${prefix}/${name}` : name
    all[key] = reducers[name]
    return all
  }, {})

  return (state = initialState, action) => {
    return createNextState(state, draft => {
      const caseReducer = useReducers[action.type]
      return caseReducer ? caseReducer(draft, action) : undefined
    })
  }
}

export default CreateReducer