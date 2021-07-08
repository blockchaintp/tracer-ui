import React from 'react'
import ReactDOM from 'react-dom'

import Store from './store'
import Router from './router'

const RootAppComponent = require('./root').default

const router = Router()
const store = Store(router, window.__INITIAL_STATE__)
const rootEl = document.querySelector('#root')

const render = () => {
  ReactDOM.render(
    <RootAppComponent
      store={store}
      router={router}
    />,
    rootEl,
  )
}

if (module.hot) {
  module.hot.accept('./root', () => {
    setTimeout(render)
  })
}

render()
