import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap'
import {Modal} from 'react-bootstrap'


var Gbtn = React.createClass({
  //初始化状态，把一些东西放到里面，便于二次修改
  getInitialState() {
    return {show: false, cutImage: $('.cutImage')[$('.cutImage').length-1], cutImage_1: $('.cutImage_1')[$('.cutImage_1').length-1]};
  },
  showModal: function(){
    //当图片被放到body里面时,盛放图片的方法
    var self = this;
    function putImage(self){
        var img = self.state.cutImage;
        var img_1 = self.state.cutImage_1;
        $('.image_container').html(img);
        $('.pre_2').html(img_1);
        $(img).css('display', 'block');
        $(img).css('width', '100%');
        $(img_1).css('display', 'block');
        if($('.image_container').height()&&$('.banner_img').height()&&$('topbar').height()&&$('.borrow').height()&&$('.navbar_1').height()){
          $(img_1).css('height', $('.pre_1')[0].offsetHeight);
        }
        else{
          setTimeout(function(){
            $(img_1).css('height', $('.pre_1')[0].offsetHeight);
          },1000);
        }
    }

    if($('.cutImage')[0]){
      console.log('this way');
      console.log($('.cutImage')[0]);
      this.setState({show: true, cutImage: $('.cutImage')[$('.cutImage').length-1], cutImage_1: $('.cutImage_1')[$('.cutImage_1').length-1]}, function(){
        putImage(self);
      })
    }

    else{
      console.log('shit');
      this.setState({show: true, cutImage: this.state.cutImage, cutImage_1: this.state.cutImage_1}, function(){
        putImage(self);
      })
    }
  },
  Submit: function(){
    //将base64压缩，压缩图片函数
    function dataURLtoBlob(base64) {
      var format = "multipart/form-data";
      var code = window.atob(base64.split(",")[1]);
      var aBuffer = new window.ArrayBuffer(code.length);
      var uBuffer = new window.Uint8Array(aBuffer);
      for(var i=0;i<code.length;i++){
        uBuffer[i]=code.charCodeAt(i);
      }
      var Builder = window.WebKitBlobBuilder || window.MozBlobBuilder;
      if(Builder){
        var builder = new Builder;
        builder.append(builder);
        return builder.getBlob(format);
      }
      else{
        return new window.Blob([uBuffer], {type: format})
      }
    }
      var formdata = new FormData();
      var self = this;
      formdata.append("file", dataURLtoBlob(self.state.cutImage.src));
      formdata.append("web", 1);
      formdata.append("file1", dataURLtoBlob(self.state.cutImage_1.src));
      formdata.append("author", $(".author").val());
      formdata.append("sentence", $(".article").val());
      if($('.cut').is(':hidden')){
        $.ajax({
          url: 'https://xss.bitworkshop.net/api/manage/modify',
          type: 'post',
          data: formdata,
          // contentType: false,
          processData: false,
          success: function(data){
            console.log(data);
          },
          error: function (xhr) {
            alert("推送失败");
          }
        })        
      }
      else{
        $.ajax({
          url: 'https://xss.bitworkshop.net/api/manage/create',
          type: 'post',
          data: formdata,
          contentType: false,
          processData: false,
          success: function(data){
            console.log(data);
            alert('上传成功');
          },
          error: function (xhr) {
            alert("推送失败");
          }
        })
      }
  	},
  hideModal: function(){
    this.setState({show: false});
  },
	render: function(){
		return(	
			<div className="btn_group">
				<Button onClick={this.Submit} disabled={this.props.text}>推送</Button>
				<Button onClick={this.showModal} className="see" disabled={this.props.text}>预览</Button>
				<Modal {...this.props} show={this.state.show} onHide={this.hideModal} dialogClassName="custom-modal" backdrop='static'>
          <Modal.Header closeButton>
            预览
          </Modal.Header>
          <Modal.Body className="modal_2">
            <div className="pre_1">
              <img className="banner_img" src={require('banner.png')} />
              <img className="topbar" src={require('topbar.png')} />
              <div className="image_container"></div>
              <img className="borrow" src={require('borrow.png')} />
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

module.exports = Gbtn;