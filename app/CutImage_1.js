import React from 'react'
import ReactDOM from 'react-dom'
import {Button} from 'react-bootstrap'
import {Modal} from 'react-bootstrap'
var Comment = require('./comment')
var Gbtn = require('./Gbtn')
var Canvas2 = require('./Canvas2')
var CutImage_c_1 = React.createClass({
	getInitialState:function(){
		return {
			left: 0,
			top: 0,
			currentX: 0,
			currentY: 0,
			flag: false,
      show: false,
      scale: 0,
      disabeld: true
		};
	},
	//点击触发图片裁剪的事件	
  Click: function(e){
      $("input[type=file]").val('');
  		$("#uploadFile").click();
      if(navigator.userAgent.indexOf("Safari")>0&&navigator.userAgent.indexOf('Chrome')<1) {
        this.refs.uploadFile.touchstart();
      }    
  		this.ReadImage(e);
  },

  //点击使弹窗显示
  showModal(){
    console.log('two click');
  	this.setState({show: true});
  },

  //点击使弹窗关闭
  hideModal(){
  	this.setState({show: false});
  },


  //读取图片并使之展示出来
  ReadImage: function(e){
  	var _this = this;
    var target = e.target;
  	$("input[type=file]").change(function(){
  		var file = this.files[0];
  		var reader = new FileReader();
  		reader.onload = function(){
  			var url = reader.result;
  			setImageURL(url);
  		};
  		reader.readAsDataURL(file);
  		var image = new Image();
  		function setImageURL(url){
  			image.src = url;
  		}
  		_this.showModal();
  		_this.PcutImage(image,target);
  	});
  },
  componentDidMount:function(){
  	document.addEventListener('mousemove',(e)=>{this.move(e);},false);
  	document.addEventListener('mouseup',(e)=>{this.endDrag(e);},false);
	},

  onChanged: function(newState){
  	this.setState(newState);
  },
    //移动函数
  move: function(event){
  	var e = event ? event : window.event;
  	if(this.state.flag){
  		var nowX = e.clientX;
  		var nowY = e.clientY;
  		var disX = nowX - this.state.currentX;
  		var disY = nowY - this.state.currentY;
  		var containerW = $('.se_body').width();
  		var containerH = $('.se_body').height();
  		var currentLeft=parseInt(this.state.left) + disX;
        var currentTop=parseInt(this.state.top) + disY;
        if(currentLeft<0){
        	currentLeft = 0;
        }else if(currentLeft>containerW-$('.canvas').width()){
        	currentLeft = containerW-$('.canvas').width();
        }
        $('.canvas').css("left", currentLeft);

        if(currentTop<0){
        	currentTop = 0;
        }
        else if(currentTop>containerH-$('.canvas').height()){
        	currentTop = containerH-$('.canvas').height();
        }
        if($('.canvas').offset().left < 0){
          currentLeft = 0;
        }
        $('.canvas').css("top", currentTop);
  	}


  },
  //结束拖拽
  endDrag: function(){
    if($('.canvas')[0]){
      var computedStyle = document.defaultView.getComputedStyle($('.canvas')[0],null);
      this.setState({
        left: computedStyle.left,
        top: computedStyle.top,
        flag: false,
      });
    }
  },
  	//准备裁剪图片
  	PcutImage: function(image,target){
  			$(".se_body").children().remove();
        if($(target).val() == 's'){
          $('.canvas').css('width','540px');
          $('.canvas').css('height','270px');
          this.setState({scale: 2}, function(){
            ReactDOM.render(<Canvas2 callbackParent={this.onChanged} scale={this.state.scale}/>, $('.se_body')[0]);
            $('.canvas').width(540);
            $('.canvas').height(270);
            $('canvas').attr('width', '540');
            $('canvas').attr('height', '270');
          });
        }
        else if($(target).val() == 'l'){
          $('.canvas').css('width', '135px');
          $('.canvas').css('height', '240px');
          this.setState({scale: 0.5625}, function(){
            ReactDOM.render(<Canvas2 callbackParent={this.onChanged} scale={this.state.scale}/>, $('.se_body')[0]);
            $('.canvas').width(135);
            $('.canvas').height(240);
            $('canvas').attr('width', '540');
            $('canvas').attr('height', '960');
          });
        }
        //盛放图片
  			$(".se_body").append(image);
  			$(image).attr('class', 'img');
  			$("se_body").css('background-color','rgba(0,0,0,.5)');
  		},	
    //确定裁剪图片
  	confirm: function(){
  		var width = $('.canvas').width();
      var height = $('.canvas').height();
      var startX = $('.left_top').offset().left - $('.se_body').offset().left;
      var startY = $('.left_top').offset().top - $('.se_body').offset().top;
      if(startX < 0){
        startX = 0;
      }
      if(startY < 0){
        startY = 0;
      }
      var canvas = $('canvas')[0];
      var ctx = canvas.getContext("2d");
      var img = $('.img')[0];
      var im = document.createElement('img');
      im.src = img.src;
      var realW = im.width;
      var realH = im.height;
      var scale = parseInt(realW)/parseInt($('.se_body').width());
      if($('canvas')[0].offsetHeight == 270){
        ctx.drawImage(img, startX*scale, startY*scale, width*scale, height*scale, 0, 0, 540, 270);
          var image = new Image();
          image.src = canvas.toDataURL('image/png');
          $(image).attr('class', 'cutImage');
      }
      else {
          ctx.drawImage(img, startX*scale, startY*scale, width*scale, height*scale, 0, 0, 540, 960);
          var image = new Image();
          image.src = canvas.toDataURL('image/png');
          $(image).attr('class', 'cutImage_1');
      }
      $('body')[0].append(image);
      this.hideModal();
      if($('.cutImage')[$('.cutImage').length-1]&&$('.cutImage_1')[$('.cutImage').length-1]){
        this.setState({disabeld: false});
      }
  	},
	render: function(){
		return(
			<div className="cut">
				<input type="file" id="uploadFile" ref="uploadFile" />
    			<div className="btn-group">
    				<Button onClick={this.Click} value="s">添加图片(S)</Button>
    				<span className="tips">建议540px*270px</span><br/>
    			</div>
    			<div className="btn-group">
    			    <Button onClick={this.Click} value="l">添加图片(L)</Button>
    				<span className="tips">建议540px*960px</span>
    			</div>
    			<Comment />
    			<Gbtn text={this.state.disabeld} value={this.props.text} />
    			<Modal {...this.props} show={this.state.show} onHide={this.hideModal} dialogClassName="custom-modal" backdrop='static'>
    				<Modal.Header closeButton>
    					请裁剪图片
    				</Modal.Header>
    				<Modal.Body className="se_body">
    				</Modal.Body>
    				<Modal.Footer>
    					<Button onClick={this.confirm}>确定</Button>
    				</Modal.Footer>
    			</Modal>
			</div>
		)
	}
})

module.exports = CutImage_c_1