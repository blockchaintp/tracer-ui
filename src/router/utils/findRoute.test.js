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
import findRoute from './findRoute'

const layer3 = {
  name: 'layer3',
  path: '/layer3',
}

const layer2 = {
  name: 'layer2',
  path: '/layer2',
  children: [layer3],
}

const layer1 = {
  name: 'layer1',
  path: '/layer1',
  children: [layer2],
}

const home = {
  name: 'home',
  path: '/'
}

const routes = [
  home,
  layer1,
]

tape('findRoute -> layer1', (t) => {
  const route = findRoute(routes, 'layer1')
  t.deepEqual(route, layer1, 'the layer1 route is correct')
  t.end()
})

tape('findRoute -> layer2', (t) => {
  const route = findRoute(routes, 'layer1.layer2')
  t.deepEqual(route, layer2, 'the layer2 route is correct')
  t.end()
})

tape('findRoute -> layer3', (t) => {
  const route = findRoute(routes, 'layer1.layer2.layer3')
  t.deepEqual(route, layer3, 'the layer3 route is correct')
  t.end()
})

tape('findRoute -> missing layer4', (t) => {
  const route = findRoute(routes, 'layer1.layer2.layer3.layer4')
  t.notok(route, 'the layer4 route is correctly missing')
  t.end()
})

tape('findRoute -> missing top level', (t) => {
  const route = findRoute(routes, 'oranges')
  t.notok(route, 'the oranges route is correctly missing')
  t.end()
})
