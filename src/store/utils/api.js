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

import settings from 'settings'

import networkActions from '../modules/network'
import snackbarActions from '../modules/snackbar'

const url = (path) => [settings.api, path].join('/').replace(/\/+/g, '/')

// catch bad status codes and run an error handler
// otherwise return the data property of the response
const process = res => {
  if(res.status >= 400) return Promise.reject(`status: ${res.status}`)
  return res.data
}

const loaderSideEffect = ({
  dispatch,
  prefix,
  name,
  dataAction,
  loader,
  returnError,
  snackbarError,
}) => {

  const networkName = 
    [prefix, name]
    .filter(s => s)
    .join('.')

  dispatch(networkActions.clearError(networkName))
  dispatch(networkActions.startLoading(networkName))

  return loader()
    .then(data => {
      if(dataAction) {
        dispatch(dataAction(data))
      }
      dispatch(networkActions.stopLoading(networkName))
      return data
    })
    .catch(error => {

      // pluck an error message from the response body if present
      let useErrorMessage = error.toString()
      const res = error.response
      if(res && res.data && res.data.error) useErrorMessage = res.data.error
      dispatch(networkActions.setError({
        name: networkName,
        value: useErrorMessage,
      }))
      dispatch(networkActions.stopLoading(networkName))
      if(snackbarError) {
        dispatch(snackbarActions.setError(useErrorMessage))
      }
      if(returnError) return Promise.reject(useErrorMessage)
    })
}

const api = {
  url,
  process,
  loaderSideEffect,
}

export default api