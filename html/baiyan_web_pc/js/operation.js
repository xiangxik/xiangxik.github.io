var theme = 'purple-passion';

//模块1
function renderBlock1() {
  var myChart = echarts.init(document.getElementById('block1'), theme);
  
}


$(document).ready(function () {
  //设置分辨率
  resetDivSize('#mainContainer');
  //监听改变
  window.onresize = function () {
    resetDivSize('#mainContainer');
  }
  //渲染模块1
  renderBlock1();
})