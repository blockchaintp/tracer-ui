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

import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const styles = theme => {
  return {
    toolbarRoot: {
      paddingRight: theme.spacing.unit,
    },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      display: 'flex',
      justifyContent: 'right',
      alignItems: 'flex-end',
    },
    title: {
      flex: '0 0 auto',
    },
  }

}

class SimpleTableHeader extends React.Component {
  render() {
    const {
      classes,
      className,
      title,
      getTitle,
      getActions,
      titleVariant,
      titleClassname,
    } = this.props

    const useClassname = `${classes.toolbarRoot} ${className ? className : ''}`

    return (
      <Toolbar
        className={ useClassname }
      >
        <div className={classes.title}>
          {
            getTitle ? (
              getTitle()
            ) : (
              <Typography className={ titleClassname } variant={ titleVariant || 'h6' }>{ title }</Typography>
            )   
          }
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {
            getActions ? getActions() : null
          }
        </div>
      </Toolbar>
    )
  }
}

SimpleTableHeader.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SimpleTableHeader)