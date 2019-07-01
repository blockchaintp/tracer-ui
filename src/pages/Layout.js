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

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import SideMenu from 'components/layout/SideMenu'
import AppBarMenu from 'components/layout/AppBarMenu'

const styles = theme => ({
  root: {
    height: '100%'
  },
  appbar: {
    flexGrow: 1,
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  logo: {
    height: '50px',
    marginRight: '20px',
    flex: 0,
  },
  content: {
    height: 'calc(100% - 64px)'
  }
})

class Layout extends React.Component {

  render() {
    const { 
      classes,
      title,
      user,
      sideMenuItems,
      appBarMenuItems,
      openPage,
      children,
    } = this.props

    return (
      <div className={ classes.root }>
        <div className={ classes.appbar }>
          <AppBar position="static">
            <Toolbar>
              <SideMenu 
                user={ user }
                items={ sideMenuItems }
                openPage={ openPage }
              />
              <Typography 
                variant="h6" 
                color="inherit" 
                className={ classes.flex }
              >
                { title }
              </Typography>
              <AppBarMenu
                user={ user }
                items={ appBarMenuItems }
                openPage={ openPage }
              />
            </Toolbar>
          </AppBar>
        </div>
        <div className={ classes.content }>
          { children }
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.object,
  sideMenuItems: PropTypes.array.isRequired,
  appBarMenuItems: PropTypes.array.isRequired,
  openPage: PropTypes.func.isRequired,
}

export default withStyles(styles)(Layout)