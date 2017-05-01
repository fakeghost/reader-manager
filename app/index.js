import React from 'react'
import ReactDOM from 'react-dom'
import {Tabs} from 'react-bootstrap'
import {Tab} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {Modal} from 'react-bootstrap'
import {Pagination} from 'react-bootstrap'
require('main.css')
require('reset.css')

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



const TabsInstance = React.createClass({


	getInitialState:function(){
		return {
			left: 0,
			top: 0,
			currentX: 0,
			currentY: 0,
			flag: false,
      show: false,
      scale: 0
		};
	},
	//点击触发图片裁剪的事件	
  Click: function(e){
      $("input[type=file]").val('');
  		$("#uploadFile").click();
  		this.ReadImage(e);
  },

  //点击使弹窗显示
  showModal(){
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
  		var containerW = $('.modal-body').width();
  		var containerH = $('.modal-body').height();
  		var currentLeft=parseInt(this.state.left) + disX;
        var currentTop=parseInt(this.state.top) + disY;
        if(currentLeft<0){
        	console.log(currentLeft);
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
  			$(".modal-body").children().remove();
        if($(target).val() == 's'){
          $('.canvas').css('width','540px');
          $('.canvas').css('height','270px');
          this.setState({scale: 2}, function(){
            ReactDOM.render(<Canvas1 callbackParent={this.onChanged} scale={this.state.scale}/>, $('.modal-body')[0]);
            $('.canvas').width(540);
            $('.canvas').height(270);
            $('canvas').attr('width', '540');
            $('canvas').attr('height', '270');
            console.log(this.state);
          });
        }
        else if($(target).val() == 'l'){
          $('.canvas').css('width', '135px');
          $('.canvas').css('height', '240px');
          this.setState({scale: 0.5625}, function(){
            ReactDOM.render(<Canvas1 callbackParent={this.onChanged} scale={this.state.scale}/>, $('.modal-body')[0]);
            $('.canvas').width(135);
            $('.canvas').height(240);
            $('canvas').attr('width', '540');
            $('canvas').attr('height', '960');
          });
        }
  			$(".modal-body").append(image);
  			$(image).attr('class', 'img');
  			$("modal-body").css('background-color','rgba(0,0,0,.5)');
  		},	
    //确定裁剪图片
  	confirm: function(){
  		var width = $('.canvas').width();
      var height = $('.canvas').height();
      var startX = $('.left_top').offset().left - $('.modal-body').offset().left;
      var startY = $('.left_top').offset().top - $('.modal-body').offset().top;
      var canvas = $('canvas')[0];
      var ctx = canvas.getContext("2d");
      var img = $('.img')[0];
      var im = document.createElement('img');
      im.src = img.src;
      var realW = im.width;
      var realH = im.height;
      console.log(width);
      console.log(realW);
      var scale = parseInt(realW)/parseInt($('.modal-body').width());
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
      // $(image).css('display', 'block');
      // $('.see').removeAttr('disabled');
      this.hideModal();

  	},
  render: function(){
  	return(
  		<Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
    		<Tab eventKey={1} title="新建推送消息">
    			<input type="file" id="uploadFile" />
    			<div className="btn-group">
    				<Button onClick={this.Click} value="s">添加图片(S)</Button>
    				<span className="tips">建议540px*270px</span><br/>
    			</div>
    			<div className="btn-group">
    			    <Button onClick={this.Click} value="l">添加图片(L)</Button>
    				<span className="tips">建议540px*960px</span>
    			</div>
    			<Comment />
    			<Gbtn />
    			<Modal {...this.props} show={this.state.show} onHide={this.hideModal} dialogClassName="custom-modal" backdrop='static'>
    				<Modal.Header closeButton>
    					请裁剪图片
    				</Modal.Header>
    				<Modal.Body>
    				</Modal.Body>
    				<Modal.Footer>
    					<Button onClick={this.confirm}>确定</Button>
    				</Modal.Footer>
    			</Modal>
    		</Tab>
    		<Tab eventKey={2} title="已推送">
    			<Title1 />
    		</Tab>
  		</Tabs>
  	)
  }
});




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

	// //开始拖拽
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




var Gbtn = React.createClass({
  getInitialState() {
    return {show: false};
  },
  showModal: function(){
    this.setState({show: true, cutImage: $(".cutImage")[0], cutImage_1: $(".cutImage_1")[0]}, function(){
      var img = $('.cutImage');
      $('.topbar').after(img);
      $('.pre_2').append($('.cutImage_1'));
      $('.cutImage').css('display', 'block');
      $('.cutImage').css('width', '100%');
      $('.cutImage_1').css('display', 'block');
      $('.cutImage_1').css('height', $('.pre_1')[0].offsetHeight);
    });
  },
  hideModal: function(){
    this.setState({show: false});
  },
  Submit: function(){
    function dataURLtoBlob(dataurl) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type:mime});
    }   
    var formdata = new FormData();
    var self = this;
    formdata.append("file", dataURLtoBlob(self.state.cutImage.src));
    formdata.append("web", 1);
    formdata.append("file1", dataURLtoBlob(self.state.cutImage_1.src));
    formdata.append("author", $(".author").val());
    formdata.append("article", $(".article").val());
    console.log(formdata.get('author'));
    $.ajax({
      url: 'http://123.207.42.17:8090/AReader/Qiniu/vendor/qiniu/php-sdk/upload.php',
      type: 'post',
      data: formdata,
      contentType: false,
      processData: false,
      success: function(data){
        console.log(data);
      },
      error: function (xhr) {
        alert("推送失败");
      }
    })
  },
	render: function(){
		return(	
			<div className="btn_group">
				<Button onClick={this.Submit}>推送</Button>
				<Button onClick={this.showModal} className="see">预览</Button>
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

var PaginationBasic = React.createClass({
    componentDidMount: function () {
    // function getTime(string) {
    //   var date = new Date(string);
    //   var year = date.getFullYear();
    //   var month = date.getMonth() + 1;
    //   var day = date.getDate();
    //   var newdate = year + 
    // }


    $.ajax({
      url: 'http://123.207.42.17:8090/AReader/ONE/index.php',
      type: 'get',
      data: {
        web: '1',
        page: 1,
        type: 'getlist',
      },
      dataType: 'jsonp',
      jsonp: 'callback',
      success: function (result) {
        for(var i=0; i<result.data.length; i++){
          $('.tbody').append('<tr><th>VOL. '+ result.data[i].vol + '</th>' + '<th><a href="###" class="preview">预览</a><br /><a href="#">编辑</a></th>' + '<th>' + result.data[i].date + '</th>' + '</tr>');
            
            //匿名函数传参，解决循环参数的问题
            (function(i){
              $($('.preview')[i]).click(function () {
              var img_1 = new Image();
              img_1.src = result.data[i].url;
              $(img_1).attr('class', 'img_1');
              var img_2 = new Image();
              img_2.src = result.data[i].v_url;
              if(img_1.complete){self.showModal();};
                $('.topbar').after(img_1);
                $('.pre_2').append(img_2);
                $(img_2).css('height', $('.pre_1').height());
            })
          })(i);
        }
        var self = this;
        this.setState({'total':result.total});
      }.bind(this),
      error: function (err) {
        console.log(err);
      }.bind(this)
    })

  },
  getInitialState() {
    return{
      activePage: 1,
      show: false
    };
  },
  showModal: function(){
    this.setState({show: true});
  },
  hideModal: function(){
    this.setState({show: false});
  },

  handleSelect(eventKey){
    this.setState({
      activePage: eventKey
    });
    $('.tbody').children('tr').remove();
    $.ajax({
      url: 'http://123.207.42.17:8090/AReader/ONE/index.php',
      type: 'get',
      data: {
        web: '1',
        page: eventKey,
        type: 'getlist',
      },
      dataType: 'jsonp',
      jsonp: 'callback',
      success: function (result) {
        for(var i=0; i<result.data.length; i++){
          $('.tbody').append('<tr><th>VOL. '+ result.data[i].vol + '</th>' + '<th><a href="###" class="preview">预览</a><br /><a href="#">编辑</a></th>' + '<th>' + result.data[i].date + '</th>' + '</tr>');
            
            //匿名函数传参，解决循环参数的问题
            (function(i){
              $($('.preview')[i]).click(function () {
              var img_1 = new Image();
              img_1.src = result.data[i].url;
              $(img_1).attr('class', 'img_1');
              var img_2 = new Image();
              img_2.src = result.data[i].v_url;
              if(img_1.complete){self.showModal();};
                $('.topbar').after(img_1);
                $('.pre_2').append(img_2);
                $(img_2).css('height', $('.pre_1').height());
            })
          })(i);
        }
        var self = this;
        this.setState({'total':result.total});
      }.bind(this),
      error: function (err) {
        console.log(err);
      }.bind(this)
    })

  },


  render(){
    return(
          <div>
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
              <Pagination
              bsSize="medium"
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              items={this.state.total}
              maxButtons={6}
              activePage={this.state.activePage}
              onSelect={this.handleSelect} />
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
