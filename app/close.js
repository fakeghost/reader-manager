import React from 'react'
import ReactDOM from 'react-dom'
var Close_div = React.createClass({
	componentDidMount: function(){
		$('.close_div').click(function(){
			$('.hidden_div').css('display', 'none');
		})
	},
	render: function(){
		return(
			<div className="close_div">
				<img src={require('close.png')} />
			</div>
			)
	}
})

module.exports = Close_div