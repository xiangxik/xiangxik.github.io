//echart主题
var theme = 'purple-passion';

//重设页面宽高
function resetDivSize(id) {
  let width = document.body.clientWidth || window.innerWidth;
  let height = document.body.clientHeight || window.innerHeight;
  let zoom1 = (width / 1920);
  let zoom2 = (height /1080);
  // console.log('宽度:'+width + ',长度：'+height);
  console.log('宽度比例：' + zoom1 + '，高度比例：' + zoom2);
  $('#wrapper').css('width', width + 'px');
  $('#wrapper').css('height', height + 'px');
  $(id).css('transform', 'scale('+ zoom1 + ',' + zoom2 + ')');
}

//用rem设置适配
function resetSizeByRem() {
  var whdef = 100/1920;// 表示1920的设计图,使用100PX的默认值
  var wH = window.innerHeight;// 当前窗口的高度
  var wW = window.innerWidth;// 当前窗口的宽度
  var rem = wW * whdef;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
  $('html').css('font-size', rem + "px");
}

function remToPx(rem) {
  var px = $('html').css('font-size').replace('px', '');
  var pxInt = +px * rem;
  console.log(pxInt)
  return pxInt + 'px';

}



//渲染柱状图1
function renderBar1() {
  var container = document.getElementById('barCharts1');
  var myChart = echarts.init(container, theme);
  var options = {
    backgroundColor: 'transparent',
    tooltip: { show: true },
    grid: {
      left: 0,
      right: 10,
      top: '10%',
      bottom: '10%'
    },
    color: ['#1e89f0', '#2EAD61'],
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLabel: { interval: 0 },
      show: false,
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }, {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }]
  }

  myChart.setOption(options, true);

}

//渲染饼图1
function renderPie1() {
  var container = document.getElementById('pieCharts1');
  var myChart = echarts.init(container);
  var options = {
    backgroundColor: 'transparent',
    tooltip: { show: true },
    grid: {
      left: 0,
      right: 10,
      top: '10%',
      bottom: '10%'
    },

    series: [
      {
        type: 'pie',
        radius: '55%',
        center: ['40%', '50%'],
        data: [
          { name: '测试1', value: 100 },
          { name: '测试2', value: 100 },
          { name: '测试3', value: 100 },
          { name: '测试4', value: 100 },
          { name: '测试5', value: 100 },
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  myChart.setOption(options, true);
}


//加载通用的函数等
function commonInit() {
  renderBar1();
  renderPie1();
  //点击展开侧边栏
  $('#siderBtn').click(function () {
    let siderObj = $('#siderWrap');
    if (siderObj.attr('data-visible') == 'false') {
      siderObj.attr('data-visible', 'true');
      siderObj.animate({ left: '0' });
    } else {
      siderObj.attr('data-visible', 'false');
      siderObj.animate({ left: '-2.72rem' });
    }
  })

  //菜单栏锁住
  $('#lockBtn').click(function () {
    let target = $('#nav');
    if (target.hasClass('nav_hover')) {
      target.removeClass('nav_hover');
      target.css('top', '0px');
    } else {
      target.css('top', '-0.44rem');
      target.addClass('nav_hover');
    }
  })

  //切换坐标图和示意图
  $('#siderGeoBtn').click(function () {
    if ($(this).text() == '坐标图') {
      // $(this).text('示意图');
      window.location.href = './indexMap.html';
    } else {
      // $(this).text('坐标图');
      window.location.href = './index.html';
    }
  });

  //lng按钮
  $("#lngBtn").click(function () {
    if($(this).attr('data-show') == 'false') {
      $(this).attr('data-show', 'true');
      $(this).css('width', '3.2rem');
      $('#lngBtnHidden').hide();
      $('#lngBtnShow').show();
    }else {
      $(this).attr('data-show', 'false');
      $(this).css('width', '.7rem');
      $('#lngBtnShow').hide();
      $('#lngBtnHidden').show();
    }
    
  })
}