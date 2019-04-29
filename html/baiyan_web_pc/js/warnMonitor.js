
//故障处理分析
function renderWarnPie1() {
  var myChart = echarts.init(document.getElementById('warnPie1'), theme);
  var options = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: "{b}: {c} ({d}%)"
    },
    color: ['#28AD55', '#1483E1', '#10ADAE'],
    legend: {
      icon: "circle", 
      orient: 'vertical',
      right: '2%',
      bottom: '5%',
      data: ['已完成', '处理中', '待处理']
    },
    graphic: {
      elements: [
        {
          type: 'text', 
          left: remToPx(1.64), 
          top:remToPx(0.96),
          style: { fill: '#fff', text: ['故障处理总量'], font: '0.18rem Microsoft YaHei'}
        },
        {
          type: 'text', 
          left: remToPx(1.72), 
          top: remToPx(1.22),
          style: { fill: '#fff', text: ['200'], font: '0.48rem Microsoft YaHei'}
        },
      ]
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '76%'],
        // avoidLabelOverlap: false,
        label: {
          normal: {
            // show: false,
            // position: 'center'
            formatter: '{b}: {d}%',
            color: '#fff'
          },
          
        },
        labelLine: {
          normal: {
            // show: true,
            length: 1,
            length2: remToPx(0.06)
          }
        },
        data: [
          { value: 335, name: '已完成' },
          { value: 310, name: '处理中' },
          { value: 234, name: '待处理' },
        ]
      }
    ]
  };
  myChart.setOption(options);
}



$(document).ready(function () {

  //监听改变
  window.onresize = function () {

  }

  renderWarnPie1();

})