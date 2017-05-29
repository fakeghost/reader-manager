import React from 'react'
import ReactDOM from 'react-dom'
var Comment = React.createClass({
	render: function(){
		return(
			<div className="comment">
				<input type="text" className="author" placeholder="请在这里输入作者"/>
				<input type="text" className="article" placeholder="请在这里输入句子"/>
			</div>
			)
	}
})

module.exports = Comment