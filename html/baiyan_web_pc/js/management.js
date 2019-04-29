$('.counter').countUp({
  delay: 10,
  time: 2000
});

var theme = 'default';

// 饼图
function renderChartPie(data) {
  var myChart = echarts.init(document.getElementById('pie'), theme);
  var options = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)",
      position: 'right',
    },
    legend: {
      orient: 'vertical',
      right: 'right',
      data: data.title,
      textStyle: { //饼图图形上的文本标签
        fontSize: '0.16rem',
        color: '#fff'
      },
    },
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: '90%',
      center: ['35%', '50%'],
      data: data.data,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      label: { //饼图图形上的文本标签
        normal: {
          show: true,
          position: 'inner', //标签的位置
          textStyle: {
            fontWeight: 300,
            fontSize: '0.12rem' //文字的字体大小
          },
          formatter: '{d}%'
        }
      },
    }]
  }

  myChart.setOption(options);
}

// 柱状图-折线图
function renderChartBarLine(data,id) {
  var myChart = echarts.init(document.getElementById(id), theme);
  var options = {
    grid: {   
      left: 30,   //距离左边的距离
      right: 30, //距离右边的距离
      bottom: '14%',//距离下边的距离
      top: 50, //距离上边的距离
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#fff'
        }
      }
    },
    color: ['red','#fff'],
    legend: {
      data: data.legend,
      textStyle: {
        color: '#fff'
      }
    },
    xAxis: [{
      type: 'category',
      data: data.title,
      axisPointer: {
        type: 'shadow'
      },
      axisLabel: {
        show: true,
        textStyle: {
            color: '#fff'
        }
      }
    }],
    yAxis: [{
        type: 'value',
        name: data.legend[0],
        nameTextStyle: {
          color: '#fff'
        },
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: '#fff'
          }
        }
      },
      {
        type: 'value',
        name: data.legend[1],
        nameTextStyle: {
          color: '#fff'
        },
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: '#fff'
          }
        }
      }
    ],
    series: [{
        name: data.legend[0],
        type: 'bar',
        data: data.bar
      },
      {
        name: data.legend[1],
        type: 'line',
        yAxisIndex: 1,
        data: data.line
      }
    ]
  }

  myChart.setOption(options);
}


function renderChartMap(mapData1, mapData2) {
  var myChart = echarts.init(document.getElementById('mapCharts'), theme);
  var options = {
    backgroundColor: 'transparent',
    tooltip: {
      show: true,
      formatter: (params, ticket, callback) => {
        let { name, todayNums, days, time, addr } = params.data;
        return `<div>
          <span>${name}</span><br/>
          <span>今日销量：${todayNums}吨</span><br/>
          <span>平稳运营：${days}天</span><br/>
          <span>运营时间：${time}</span><br/>
          <span>地址：${addr}</span>
        <div>`;
      }
    },
    legend: {
      top: 'bottom',
      show: true
    },
    geo: {
      map: 'china',
      label: {
        normal: { show: false },
        emphasis: { show: false }
      },
      regions: [
        {
          name: '南海诸岛',
          value: 0,
          itemStyle:
          {
            normal:
            {
              opacity: 0,
              label: {
                show: false
              }
            }
          }
        }],
      roam: false,
      itemStyle: {
        normal: {
          areaColor: 'rgba(0,153,255,0.6)',
          borderColor: '#09F'
        },
        emphasis: {
          areaColor: 'rgba(0,153,255,0.6)',
          borderColor: '#09F'
        }
      }
    },
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'pin',
        symbolSize: 30,
        rippleEffect: {
          brushType: 'stroke'
        },
        label: {
          normal: { show: false },
          emphasis: { show: false }
        },
        itemStyle: {
          normal: { color: 'rgba(48,254,3,0.8)' },
          emphasis: { color: 'rgba(0,253,10,1)' }
        },
        data: mapData1
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'pin',
        symbolSize: 30,
        rippleEffect: {
          brushType: 'stroke'
        },
        label: {
          normal: { show: false },
          emphasis: { show: false }
        },
        itemStyle: {
          normal: { color: 'rgba(253,0,1,0.8)' },
          emphasis: { color: 'rgba(246,33,87,1)' }
        },
        data: mapData2
      },
    ]
  }

  myChart.setOption(options);
}


$(document).ready(function () {
  
  navInit();


  var Piedata = {
    title: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
    data: [{
        value: 335,
        name: '直接访问'
      },
      {
        value: 310,
        name: '邮件营销'
      },
      {
        value: 234,
        name: '联盟广告'
      },
      {
        value: 135,
        name: '视频广告'
      },
      {
        value: 1548,
        name: '搜索引擎'
      }
    ]
  }
  var barLineData = {
    bar: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
    line: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
    title: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    legend: ['销售量', '平均单价']
  }  
  renderChartPie(Piedata);
  renderChartBarLine(barLineData,'barLine1');
  renderChartBarLine(barLineData,'barLine2');

  // ----------------地图-------------
  // 数据
  var mapData1 = [
    { 
      name: "深圳加气站", value: [114.5435, 22.5439, "943.68"], 
      todayNums: 23, days: 1235, time: '2001.12.12', addr: '深圳福田区'
    }
  ];
  var mapData2 = [
    { 
      name: "江门加气站", value: [112.6318, 22.1484, '982.63'],
      todayNums: 23, days: 1235, time: '2001.12.12', addr: '江门'
    },
    { 
      name: "长春加气站", value: [125.8154, 44.2584, '989.98'],
      todayNums: 23, days: 1235, time: '2001.12.12', addr: '长春'
    },
  ]
  renderChartMap(mapData1, mapData2);
  
  // ---------------地图结束-------------
  // 12个月的销售量与平均单价 tab切换
  $('.tabTitle').on('click','span',function(e) {  
    $(this).addClass('active').siblings().removeClass('active')
    if($(this).attr('data') === 'all') {  // 全部监控站 
      // 获取新数据  
      barLineData.bar = [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
      barLineData.line = [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      // 获取新数据 
      renderChartBarLine(barLineData);
    }else {  //TOP10监控站
      barLineData.line = [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
      barLineData.bar = [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      renderChartBarLine(barLineData);
    }
  })

  // 昨日今日前7日前一月销量切换
  $('.tabBox').on('click','span',function(e) {
    console.log($('.tabBox .active').attr('data'))
    $(this).addClass('active').siblings().removeClass('active')
    // 根据$(this).attr('data')值去请求接口获取数据并更新数据
    if($('.tabBox .active').attr('data') === '1') {
      // 数字跳动
      $('.searchData1 .counter').countUp({
        delay: 10,
        time: 2000
      });
      $('.searchData1').css('display','flex');
      $('.searchData2').css('display','none');
    }else {
      renderChartBarLine(barLineData,'barLine2');
      $('.searchData1').css('display','none');
      $('.searchData2').css('display','flex');
    }
  })

  // 搜索
  $('#search').on('click',function() {
    // 根据条件去请求接口
    // 开始时间$('#time1').val()
    // 结束时间$('#time2').val()
    // tab值$('.tabBox .active').attr('data')
  })

  // 时间插件
  layui.use('laydate', function(){
    var laydate = layui.laydate; 
    laydate.render({
      elem: '#time1' 
    });
    laydate.render({
      elem: '#time2' 
    });
  });

  // 获取时间函数
  function getTime() {
    var now = new Date();
    var month = now.getMonth()+1 > 9 ? now.getMonth()+1 : '0' + (now.getMonth()+1)
    var day = now.getDate() > 9 ? now.getDate() : '0' + now.getDate()
    var hour = now.getHours() > 9 ? now.getHours() : '0' + now.getHours()
    var min = now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes()
    var second = now.getSeconds() > 9 ? now.getSeconds() : '0' + now.getSeconds()
    var time = now.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + second;
    $('.time').text(time)
  }
  getTime();
  // 时间更新
  setInterval(getTime,1000)

  $("#scrollDiv").Scroll({line:1,speed:500,timer:3000});
  $('#scrollDiv li[data=2]').css('background','#004fc0')


  //监听改变
  window.onresize = function () {
    resetSizeByRem();
  }
})