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
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  root: {
    width: '100%',
  },
  table: {

  },
  tableWrapper: {
    overflowX: 'auto',
  },
  autoCell: {
    width: 'auto',
  },
})

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

  handleChangeRowsPerPage = (event) => {
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
                      fields.map((field, i) => (
                        <TableCell key={i} align={field.numeric ? 'right' : 'left'}>
                          { field.title }
                        </TableCell>
                      ))
                    }
                  </TableRow>
                </TableHead>
              )
            }
            <TableBody>
              {
                (typeof data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map === 'function')
                  && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((dataRow) => {
                    if (dataRow.events !== undefined) {
                      return dataRow.events.map((event) => (
                        <TableRow
                          key={Math.floor(Math.random() * 10000)}
                        >
                          {
                              fields.map((field, i) => {
                                if (i == 0) {
                                  return (
                                    <TableCell key={i} align={field.numeric ? 'right' : 'left'} className={classes.autoCell}>
                                      {
                                        event.eventType
                                      }
                                    </TableCell>
                                  )
                                }
                                return (
                                  <TableCell key={i} align={field.numeric ? 'right' : 'left'} className={classes.autoCell}>
                                    <List className={classes.autoCell}>
                                      {
                                        event.attributes.map((attribute) => (
                                          <ListItem className={classes.autoCell}>
                                            <ListItemText className={classes.autoCell}>
                                              { `${attribute.key} : ${attribute.value}` }
                                            </ListItemText>
                                          </ListItem>
                                        ))
                                      }
                                    </List>
                                  </TableCell>
                                )
                              })
                            }
                        </TableRow>
                      ))
                    }
                    return (
                      <TableRow
                        key={Math.floor(Math.random() * 10000)}
                      >
                        <TableCell key={0}>
                          <List className={classes.autoCell}>
                            <ListItem className={classes.autoCell}>
                              <ListItemText className={classes.autoCell}>
                                header:
                                {' '}
                                {dataRow.header}
                              </ListItemText>
                            </ListItem>
                            <ListItem className={classes.autoCell}>
                              <ListItemText className={classes.autoCell}>
                                signature:
                                {' '}
                                {dataRow.header_signature}
                              </ListItemText>
                            </ListItem>
                            <ListItem className={classes.autoCell}>
                              <ListItemText className={classes.autoCell}>
                                trace:
                                {' '}
                                {(dataRow.trace) ? 'true' : 'false'}
                              </ListItemText>
                            </ListItem>
                          </List>
                        </TableCell>
                        <TableCell key={1}>
                          <List className={classes.autoCell}>
                            {
                                  dataRow.transactions.map((transaction) => (
                                    <ListItem className={classes.autoCell}>
                                      <Card>
                                        <CardContent>
                                          <Typography variant="subtitle1">
                                            header:
                                            {' '}
                                            {transaction.header}
                                          </Typography>
                                          <Typography variant="subtitle1">
                                            signature:
                                            {' '}
                                            {transaction.header_signature}
                                          </Typography>
                                          <Typography variant="subtitle1">
                                            payload:
                                            {' '}
                                            {transaction.payload}
                                          </Typography>
                                        </CardContent>
                                      </Card>
                                    </ListItem>
                                  ))
                                }
                          </List>
                        </TableCell>
                      </TableRow>
                    )
                  })
              }
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
