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

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const styles = theme => {
  return {
    root: {
      width: '100%',
    },
    table: {
      
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    autoCell: {
      width: 'auto'
    },
  }

}

class SimpleTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      page: 0,
      rowsPerPage: 25,
    };
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  render() {
    const { 
      classes,
      selected,
      data,
      fields,
      getActions, 
      onRowClick,
      pagination,
      hideHeaderIfEmpty,
    } = this.props

    const {
      rowsPerPage,
      page,
    } = this.state

    return (
      <div className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            {
              (!hideHeaderIfEmpty || data.length > 0) && (
                <TableHead>
                  <TableRow>
                    {
                      fields.map((field, i) => {
                        return (
                          <TableCell key={ i } align={ field.numeric ? 'right' : 'left' }>
                            { field.title }
                          </TableCell>
                        )
                      })
                    }
                    {
                      getActions ? (
                        <TableCell align='right'>
                          Actions
                        </TableCell>
                      ) : null
                    }
                  </TableRow>
                </TableHead>
              )
            }
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(dataRow => {
                  return (<TableCell>{console.log(dataRow)}</TableCell>)
              })}
            </TableBody>
          </Table>
        </div>
        {
          pagination && (
            <TablePagination
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          )
        }
      </div>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SimpleTable)