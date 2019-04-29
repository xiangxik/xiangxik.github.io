
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
  //设置分辨率
  // resetSizeByRem();
  //监听改变
  window.onresize = function () {
    resetSizeByRem();
  }

  //数据
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

  renderBar1();
  renderPie1();
  renderChartMap(mapData1, mapData2);

  //加载百度地图
  renderBaiduMap();

  //加载通用事件
  commonInit();

  
  //翻页效果
  $('.dataStatistics').dataStatistics({ min: 0, max: 150, time: 100, len: 4 });

  //刷新
  setInterval(function () {
    renderChartMap([], []);
    renderChartMap(mapData1, mapData2);

  }, 3000);

})