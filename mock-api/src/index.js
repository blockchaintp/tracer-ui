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

const express = require('express')
const bodyParser = require('body-parser')

const pino = require('pino')({
  name: 'app',
})


const PORT = process.env.PORT || 80
const fixtures = require('./fixtures')

const app = express()
app.use(bodyParser.json())

app.get('/api/v1/transactions/:type', (req, res, next) => {
  const type = req.params.type
  const data = fixtures.transactions[type]

  if(!data) return next(`no transactions found of type: ${type}`)

  const mappedData = data.map((item, i) => {
    return Object.assign({}, item, {
      id: i,
      created: new Date().getTime(),
    })
  })

  res.json(mappedData)
})

app.use((req, res, next) => {
  const error = `url ${req.url} not found`
  pino.error({
    action: 'error',
    error,
    code: 404,
  })
  res.status(res._code || 404)
  res.json({ error })
})

/*

  error handler - any route that calls the err handler will end up here
  always prefer a JSON response
  
*/
app.use((err, req, res, next) => {
  pino.error({
    action: 'error',
    error: err.error ? err.error.toString() : err.toString(),
    stack: err.stack,
    code: res._code || 500
  })
  res.status(res._code || 500)
  res.json({ error: err.toString() })
})

app.listen(PORT, () => {
  pino.info({
    action: 'webserver.start',
    message: `webserver started on port ${PORT}`,
  })
})
