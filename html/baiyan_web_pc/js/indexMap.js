//加载百度地图
function renderBaiduMap() {

  var map = Loca.create('mapPage', {
    mapStyle: 'amap://styles/darkblue',
    zoom: 4,
    center: [116.397428, 39.90923]
  });
  var layer = Loca.visualLayer({
    eventSupport: true,    // selectStyle 配置需要开启 eventSupport: true
    container: map,
    type: 'point',
    shape: 'circle'
  });
  var data = [
    { "lnglat": [114.5435, 22.5439], "name": "深圳加气站", "style": 2, type: 2, addr: '深圳'},
    { "lnglat": [112.6318, 22.1484], "name": "江门加气站", "style": 2, type: 1, addr: '江门'},
    { "lnglat": [125.8154, 44.2584], "name": "长春加气站", "style": 2, type: 1, addr: '长春'},
  ];
  layer.on('mousemove', function (ev) {
    // 事件类型
    var type = ev.type;
    // 当前元素的原始数据
    var rawData = ev.rawData;
    // 原始鼠标事件
    var originalEvent = ev.originalEvent;

    openInfoWin(map.getMap(), originalEvent, {
      '名称': rawData.name,
      '位置': rawData.addr
    });
  });

  layer.on('mouseleave', function (ev) {
    closeInfoWin();
  });
  layer.setData(data, {
    type: 'json',
    lnglat: 'lnglat'
  });

  layer.setOptions({
    style: {
      radius: 10,
      color: function(res) {
        if(res.value.type == 1) {
          return 'rgb(253,0,1)';
        }
        return 'rgb(48,254,3)';
      },
      borderColor: '#ffffff',
      borderWidth: 1.5,
      opacity: 0.8
    },
    selectStyle: {
      radius: 14,
      color: '#ffe30a'
    }
  });
  layer.setFitView();
  layer.render();
}

$(document).ready(function () {
  
  //监听改变
  window.onresize = function () {
    resetSizeByRem();
  }

  //加载百度地图
  renderBaiduMap();

  //加载通用事件
  commonInit();

  //翻页效果
  $('.dataStatistics').dataStatistics({ min: 0, max: 150, time: 100, len: 4 });


})