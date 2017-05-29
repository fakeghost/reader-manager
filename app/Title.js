import React from 'react'
import ReactDOM from 'react-dom'
import {Modal} from 'react-bootstrap'
var PaginationBasic = require('./PaginationBasic')

var Title1 = React.createClass({
  getInitialState() {
    return {show: false};
  },
  showModal: function(){
    this.setState({show: true});
  },
  hideModal: function(){
    this.setState({show: false});
  },

	render: function(){
		return(
			<div className="list">
				<table className="table">
					<thead>
						<tr>
							<th>刊号</th>
							<th>操作</th>
							<th>日期</th>
						</tr>
					</thead>
					<tbody className="tbody">
					</tbody>
				</table>
        <PaginationBasic />        
        <Modal {...this.props} show={this.state.show} onHide={this.hideModal} dialogClassName="custom-modal" backdrop='static'>
            <Modal.Header closeButton>
              预览
            </Modal.Header>
            <Modal.Body className="modal_2">
              <div className="pre_1">
                <img src={require('banner.png')} />
                <img className="topbar" src={require('topbar.png')} />
                <img src={require('borrow.png')} />
                <img className="navbar_1" src={require('navbar.png')} alt=""/>
              </div>
              <div className="pre_2">
              </div>
            </Modal.Body>
        </Modal>
			</div> 
			)
	}
})

module.exports = Title1;