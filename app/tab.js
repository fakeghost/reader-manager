import React from 'react'
import ReactDOM from 'react-dom'
import {Tabs} from 'react-bootstrap'
import {Tab} from 'react-bootstrap'
var Title1 = require('./Title')
var CutImage = require('./CutImage')
const TabsInstance = React.createClass({
  render: function(){
  	return(
  		<Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
    		<Tab eventKey={1} title="新建推送消息">
          <CutImage />
    		</Tab>
    		<Tab eventKey={2} title="已推送">
    			<Title1 />
    		</Tab>
  		</Tabs>
  	)
  }

});

module.exports = TabsInstance;