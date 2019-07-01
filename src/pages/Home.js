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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import SimpleTable from 'components/table/SimpleTable'

const transactionFields =[{
  title: 'Payload',
  name: 'name',
}, {
  title: 'Created',
  name: 'created',
}]

const styles = theme => ({
  
})

class HomePage extends React.Component {

  constructor(props){
    super(props)
    this.state = { value: 0}
  }

  render() {
    const { 
      readTransactions,
      writeTransactions,
    } = this.props
    return (
      <div>
      </div>
    )
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(HomePage)