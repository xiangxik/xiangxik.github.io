

$(document).ready(function() {

  //加载通用事件
  commonInit();

  //渲染列表
  var html = template('tpl1',{ list : [1,2,3,4,5,6,7,8,9,10]});
  
  $('.siteList').html(html)

})