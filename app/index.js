import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import {Pagination} from 'react-bootstrap';
var TabsInstance = require('./tab.js');
require('main.css');
require('reset.css');

//头部文件
var Header = React.createClass({
	render: function(){
			return(
				<div className="header">
					<img src={require('logo.jpg')} alt=""/>
					<span>小书生后台管理</span>
				</div>
				)
	}
})

//下面侧边栏
var Sidebar = React.createClass({
	render: function(){
		return(
			<div className="sidebar-wrapper">
				<ul className="sidebar-nav">
					<li className="sidebar-brand">
						<a href="#">
							<img src={require('icon.png')} alt=""/>
						</a>
						<span>功能</span>
					</li>
					<li><a href="#">推送功能</a></li>
				</ul> 
			</div>
			)
	}
})

var Content = React.createClass({
	render: function(){
		return(
				<div className="content">
					<h2>推送功能</h2>
					<div>
						<TabsInstance />
					</div>					
				</div>
			)
	}
})	

var Container = React.createClass({
	render: function(){
		return(
			<div className="container">
				<Sidebar />
				<Content />
			</div>
			)
	}
})

ReactDOM.render(
	<div className="wrap">
		<Header />
		<Container />
	</div>,
	document.getElementById('root')
)