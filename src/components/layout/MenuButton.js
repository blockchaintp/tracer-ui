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
import Button from '@material-ui/core/Button'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

const styles = (theme) => ({
  
})

class MenuButton extends React.Component {
  state = {
    anchorEl: null,
    items: null,
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ 
      anchorEl: null,
      items: null,
    })
  }

  clickItem(item) {
    const {
      openPage,
    } = this.props

    if(item.items) {
      this.setState({
        items: item.items,
      })
      if(item.handler) {
        item.handler()
      }
      return
    }

    if(typeof(item.handler) === 'string') {
      openPage(item.handler)
      this.handleClose()
    }
    else if(typeof(item.handler) === 'function') {
      item.handler()
      this.handleClose()
    }
    else {
      throw new Error(`unknown AppBarMenu item handler for ${item.title}`)
    }
  }

  getMenu() {
    const items = this.state.items || this.props.items

    return items.map((item, i) => {
      if(item === '-') {
        return (
          <Divider key={ i } />
        )
      }

      return (
        <MenuItem
          key={ i }
          onClick={ () => this.clickItem(item) }
        >
          {
            item.icon && (
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
            )
          }
          <ListItemText 
            primary={ item.title }
          />
        </MenuItem>
      )
    })
  }

  render() {
    const { 
      classes, 
      title,
      icon,
      buttonProps,
    } = this.props

    const { 
      anchorEl,
    } = this.state

    const ButtonIcon = icon

    const open = Boolean(anchorEl)

    return (
      <div className={ classes.root }>
        <Button
          aria-owns={ open ? 'menubutton-button' : null }
          aria-haspopup="true"
          onClick={ this.handleMenu }
          {...buttonProps}
        >
          { title }
          { ButtonIcon && (
            <ButtonIcon />
          ) }
        </Button>
        <Menu
          id="menubutton-button"
          anchorEl={ anchorEl }
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={ open }
          onClose={ this.handleClose }
        >
          <MenuItem key="placeholder" style={{display: "none"}} />
          { this.getMenu() }
        </Menu>
      </div>
    )
  }
}

MenuButton.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
}

export default withStyles(styles)(MenuButton)