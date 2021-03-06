import React from 'react'
import ReactDOM from 'react-dom'
import {Modal} from 'react-bootstrap'
import {Pagination} from 'react-bootstrap'
var CutImage_1 = require('./CutImage_1')
var CloseDiv = require('./close')
var PaginationBasic = React.createClass({
    componentDidMount: function () {
      var author = new Array;
      var sentence = new Array;
    $.ajax({
      url: 'https://xss.bitworkshop.net/api/one/page/1/5',
      type: 'get',
      dataType: 'json',
      success: function (result) {
        console.log(result);
        for(var i=0; i<result.data.length; i++){
          $('.tbody').append('<tr><th>VOL. '+ result.data[i].vol + '</th>' + '<th><a href="###" class="preview">预览</a><br /><a href="###" class="editor">编辑</a></th>' + '<th>' + result.data[i].date + '</th>' + '</tr>');
            
            function preClick(i){
              $($('.preview')[i]).click(function () {
              var img_1 = new Image();
              img_1.src = result.data[i].url;
              $(img_1).attr('class', 'img_1');
              var img_2 = new Image();
              img_2.src = result.data[i].v_url;
              if(img_1.complete){self.showModal();}
              else{
                alert('图片尚未加载完成,请等待一下吧');
              }
                $('.topbar').after(img_1);
                $('.pre_2').append(img_2);
                setTimeout(function(){
                  $(img_2).css('height', $('.pre_1').height())
                }, 1000)
            })
            }
            author[i] = result.data[i].author;
            sentence[i] = result.data[i].sentence;
            //匿名函数传参，解决循环参数的问题
            (function(i){
              preClick(i);
              $($('.editor')[i]).click(function(){
                let vol = $(this).parent('th').prev().text();
                self.edit(vol, author[i], sentence[i]);
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
    var author = new Array;
    var sentence = new Array;
    this.setState({
      activePage: eventKey
    });
    $('.tbody').children('tr').remove();
    $.ajax({
      url: 'https://xss.bitworkshop.net/api/one/page/'+eventKey+'/5',
      type: 'get',
      dataType: 'json',
      success: function (result) {
        for(var i=0; i<result.data.length; i++){
          $('.tbody').append('<tr><th>VOL. '+ result.data[i].vol + '</th>' + '<th><a href="###" class="preview">预览</a><br /><a href="###" class="editor">编辑</a></th>' + '<th>' + result.data[i].date + '</th>' + '</tr>');
            //匿名函数传参，解决循环参数的问题
            (function(i){
              //预览按钮的编写
              $($('.preview')[i]).click(function () {

              var img_1 = new Image();
              img_1.src = result.data[i].url;
              $(img_1).attr('class', 'img_1');
              var img_2 = new Image();
              img_2.src = result.data[i].v_url;
              if(!img_1.complete){
                alert('图片尚未加载完成,请等待一下吧');
              }
              if(img_1.complete){self.showModal();}
                $('.topbar').after(img_1);
                $('.pre_2').append(img_2);
                $(img_2).css('height', $('.pre_1').height());
            })
            author[i] = result.data[i].author;
            sentence[i] = result.data[i].sentence;
            $('.editor').click(function(){
              let vol = $(this).parent('th').prev().text()
              self.edit(vol, author[i], sentence[i]);
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
  edit: function(vol, author, sentence){
      $('.hidden_div').css('display', 'block');
      this.setState({'vol': vol});
      let self = this;
      ReactDOM.render(<div><CutImage_1 text={self.state.vol}/><CloseDiv /></div>, $('.hidden_div')[0]);
      console.log($(".author"));
      $($(".author")[1]).attr('placeholder', author);
      $($(".article")[1]).attr('placeholder', sentence);
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
              <div className="hidden_div">
              </div>
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

module.exports = PaginationBasic;