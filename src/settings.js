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

import HomeIcon from '@material-ui/icons/Home'
import ViewIcon from '@material-ui/icons/Visibility'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const icons = {
  home: HomeIcon,
  view: ViewIcon,
  more: MoreVertIcon,
}

const settings = {
  title: 'Tracer UI',
  api: '/api/v1',
  devMode: process.env.NODE_ENV === 'development',
  snackbarAutoHide: 5000,
  sideMenuWidth: 250,
  icons,
  sideMenu: ({
    handlers,
  }) => {
    return [{
      title: 'Home',
      handler: 'home',
      icon: icons.home,
    }]
  },
  appbarMenu: ({
    handlers,
  }) => {
    return [{
      title: 'Home',
      handler: 'home',
      icon: icons.home,
    }]
  },
}

export default settings