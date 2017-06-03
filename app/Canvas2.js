import React from 'react';
import ReactDOM from 'react-dom';

//画布组件
var Canvas1 = React.createClass({
  getInitialState:function(){
		return {
			left: 0,
			top: 0,
			currentX: 0,
			currentY: 0,
			flag: false,
		}
	},

	//开始拖拽
  startDrag: function(e){
  	var drag = document.getElementsByTagName('canvas')[0];
  	var newState = {};
  	var event = e || window.event;
  	event.preventDefault();
  	newState.currentX = event.clientX;
  	newState.currentY = event.clientY;
  	newState.flag = true;
  	this.props.callbackParent(newState);
  },
  drag: function(e){
    this.setState({className: e.target.className});
    this.state.rx = $('.right_top').offset().left;
    this.state.pos = {x1: e.clientX, y1: e.clientY};
    this.state.posX = $('.canvas').offset().left;
    this.state.posY = $('.canvas').offset().top;
    var nowX = e.clientX;
    var nowY = e.clientY;
    var data = {};
    if(Math.floor($('.canvas').width()) == 540){
      data.scale = 2;
    }
    else{
      data.scale = 0.5625;
    }
    this.props.callbackParent(data);
  	$(document)[0].addEventListener('mousemove', this.handle, false);
  	var self = this;
  	this.clean(self);
  },
  handle: function(e){
      var self = this;
      var scale = self.props.scale;

        e.preventDefault();
        //右下角固定坐标X，Y
        var x = parseInt($('.modal-body').width()) + $('.modal-body').offset().left;
        var y = parseInt($('.modal-body').height()) + $('.modal-body').offset().top;
        //左下角固定坐标X, Y
        var ld_x = $('.modal-body').offset().left;
        var ld_y = parseInt($('.modal-body').height()) + $('.modal-body').offset().top;

        //拉伸框左上角坐标X，Y
        var lx = $('.left_top').offset().left;
        var ly = $('.left_top').offset().top;
        //拉伸框右上角的坐标X, Y
        var rx = $('.right_top').offset().left;
        var ry = $('.right_top').offset().top;
        //拉伸框左下角的坐标      
        var dy = $('.left_bottom').offset().top;
        

        //当前鼠标坐标X，Y
        var _x = e.clientX;
        var _y = e.clientY;
        //拉右下边的情况
        if(this.state.className == "right_bottom control"){
            if(_x > x){
              _x = x;
            }
            if(_y > y){
              _y = y;
            }
          var height = _y - ly;
          var width = height*scale;
          if(width > _x - lx){
              width = _x - lx;
              height = width/scale;
          }
          $('.canvas').width(width);
          $('.canvas').height(height);
        }
        //拉左下边的情况
        else if(this.state.className == "left_bottom control"){
          if(_x < ld_x){
            _x = ld_x;
          }
          if(_y > y){
            _y = y;
          }
          var changeW = e.clientX - this.state.pos.x1;
          this.state.pos = {x1: e.clientX}
          $('.canvas').css('left', parseInt($('.canvas').position().left) + changeW);
          if($('.canvas').position().left < 0){
            $('.canvas').css('left', 0);
          }
          if($('.modal-body').width() - $('.canvas').position().left - $('.canvas').width() < 0){
            $('.canvas').position().left = $('.modal-body').width() - $('.canvas').width();
          }

          var height = _y - ry;
          var width = height*scale;
          if(width > this.state.rx - _x){
            width = this.state.rx - _x;
            height = width/scale;
          }
          $('.canvas').width(width);
          $('.canvas').height(height);
        }
        else if(this.state.className == "right_top control"){
          if(_x > x){
            _x = x;
          }
          if(_y < ry){
            _y = ry;
          }

          var changeH = e.clientX - this.state.pos.y1;
          this.state.pos = {y1: e.clientY};
          $('.canvas').css('top', parseInt($('.canvas').position().top) - changeH);


          var height = _y - dy;
          var width = height*scale;
          if(width > _x - lx){
            width = _x - lx;
            height = width/scale;
          }
        }


        //对比此时的宽度和鼠标x坐标的比较
        // if(_x > lx+50){
        // }
        // else{
        //   if(width > lx - _x + parseInt($('.canvas').width())){
        //     width = lx - _x + parseInt($('.canvas').width());
        //     console.log("计算之后的宽度"+width);
        //     height = width/scale;
        //   }
        // }

  },
  clean: function(self){
  	$(document)[0].addEventListener('mouseup',function(){
  		$(document)[0].removeEventListener('mousemove', self.handle, false);
  	},false)
  },
	render: function(){
		return(
			<div className="canvas">
				<div className="left_top control"></div>
				<div onMouseDown={this.drag} className="right_top control"></div>
				<div onMouseDown={this.drag} className="left_bottom control"></div>
				<div className="center"  onMouseDown={this.startDrag}></div>
				<div onMouseDown={this.drag} className="right_bottom control"></div>
				<canvas></canvas>
			</div>
			)
	}
})

module.exports = Canvas1