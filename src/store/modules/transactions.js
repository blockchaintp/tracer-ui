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

import axios from 'axios'
import CreateReducer from '../utils/createReducer'
import CreateActions from '../utils/createActions'
import api from '../utils/api'

const prefix = 'transactions'

const initialState = {
  transactions: {
    read: [],
    write: [],
  },
  loops: {
    read: null,
    write: null,
  },
}

const reducers = {
  setTransactions: (state, action) => {
    const {
      type,
      data,
    } = action.payload
    const existingData = state.transactions[type]
    const newData = data.concat(existingData)
    state.transactions[type] = newData
  },
  setWriteTransactions: (state, action) => {
    state.writeTransactions = action.payload
  },
  setLoop: (state, action) => {
    const {
      name,
      value,
    } = action.payload
    state.loops[name] = value
  },
}

const loaders = {

  loadTransactions: (type) => axios.get(api.url(`/${type}`))
    .then(api.process),
    
}

const sideEffects = {

  loadTransactions: (type) => (dispatch, getState) => api.loaderSideEffect({
    dispatch,
    loader: () => loaders.loadTransactions(type),
    prefix,
    name: `loadTransactions.${type}`,
    dataAction: (data) => actions.setTransactions({
      type,
      data,
    }),
    snackbarError: true,
  }),
  startLoadTransactionLoop: (type) => async (dispatch, getState) => {
    await dispatch(actions.loadTransactions(type))
    const intervalTaskId = setInterval(() => {
      dispatch(actions.loadTransactions(type))
    }, 1000)
    dispatch(actions.setLoop({
      name: type,
      value: intervalTaskId,
    }))
  },
  stopLoadTransactionLoop: (type) => (dispatch, getState) => {
    const intervalTaskId = getState().transactions.loops[type]
    clearInterval(intervalTaskId)
    dispatch(actions.setLoop({
      name: type,
      value: null,
    }))
  },
}

const reducer = CreateReducer({
  initialState,
  reducers,
  prefix,
})

const actions = CreateActions({
  reducers,
  sideEffects,
  prefix,
})

export {
  actions,
  reducer,
}

export default actions