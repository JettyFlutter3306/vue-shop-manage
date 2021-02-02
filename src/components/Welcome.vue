<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>欢迎使用</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <div id="chart1" style="width: 500px;height: 500px;display: inline-block"></div>
      <div id="chart2" style="width: 500px;height: 500px;display: inline-block"></div>
      <div id="chart3" style="width: 500px;height: 500px;display: inline-block"></div>
      <div id="chart4" style="width: 500px;height: 500px;display: inline-block"></div>
    </el-card>


  </div>
</template>

<script>
export default {
  name: "Welcome",
  data(){
    return{

    }
  },
  methods: {
    drawPic1(){
      let echarts = require('echarts');//导入echarts
      let chart1 = echarts.init(document.getElementById('chart1'));

      let data = [];
      for (let i = 0; i <= 100; i++) {
        let theta = i / 100 * 360;
        let r = 5 * (1 + Math.sin(theta / 180 * Math.PI));
        data.push([r, theta]);
      }

      chart1.setOption({
        title: {
          text: '极坐标双数值轴'
        },
        legend: {
          data: ['line']
        },
        polar: {},
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
        },
        series: [{
          coordinateSystem: 'polar',
          name: 'line',
          type: 'line',
          data: data
        }]
      })
    },
    drawPic2(){
      let echarts = require('echarts');//导入echarts
      let chart2 = echarts.init(document.getElementById('chart2'));

      let data = [];
      for (let i = 0; i <= 360; i++) {
        let t = i / 180 * Math.PI;
        let r = Math.sin(2 * t) * Math.cos(2 * t);
        data.push([r, i]);
      }

      chart2.setOption({
        title: {
          text: '极坐标双数值轴'
        },
        legend: {
          data: ['line']
        },
        polar: {
          center: ['50%', '54%']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [{
          coordinateSystem: 'polar',
          name: 'line',
          type: 'line',
          showSymbol: false,
          data: data
        }],
        animationDuration: 2000
      })
    },
    drawPic3(){
      let echarts = require('echarts');//导入echarts
      let chartDom = document.getElementById('chart3');
      let myChart = echarts.init(chartDom);
      let option;

      setTimeout(function () {

        option = {
          legend: {},
          tooltip: {
            trigger: 'axis',
            showContent: false
          },
          dataset: {
            source: [
              ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
              ['Milk Tea', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
              ['Matcha Latte', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
              ['Cheese Cocoa', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
              ['Walnut Brownie', 25.2, 37.1, 41.2, 18, 33.9, 49.1]
            ]
          },
          xAxis: {type: 'category'},
          yAxis: {gridIndex: 0},
          grid: {top: '55%'},
          series: [
            {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
            {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
            {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
            {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
            {
              type: 'pie',
              id: 'pie',
              radius: '30%',
              center: ['50%', '25%'],
              emphasis: {focus: 'data'},
              label: {
                formatter: '{b}: {@2012} ({d}%)'
              },
              encode: {
                itemName: 'product',
                value: '2012',
                tooltip: '2012'
              }
            }
          ]
        };

        myChart.on('updateAxisPointer', function (event) {
          var xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1;
            myChart.setOption({
              series: {
                id: 'pie',
                label: {
                  formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                },
                encode: {
                  value: dimension,
                  tooltip: dimension
                }
              }
            });
          }
        });

        myChart.setOption(option);

      });

      option && myChart.setOption(option);
    },
    drawPic4(){
      let echarts = require('echarts');//导入echarts
      let chartDom = document.getElementById('chart4');
      let myChart = echarts.init(chartDom);
      let option;

      function func(x) {
        x /= 10;
        return Math.sin(1 / x) * (x * x) * 50;
      }

      function generateData() {
        let data = [];
        for (let i = -200; i <= 200; i += 0.1) {
          data.push([i, func(i)]);
        }
        return data;
      }

      option = {
        title: {
          text: 'sin(1/x) * x^2'
        },
        animation: false,
        grid: {
          top: 40,
          left: 50,
          right: 40,
          bottom: 50
        },
        xAxis: {
          name: 'x',
          minorTick: {
            show: true
          },
          minorSplitLine: {
            show: true
          }
        },
        yAxis: {
          name: 'y',
          min: -100,
          max: 100,
          minorTick: {
            show: true
          },
          minorSplitLine: {
            show: true
          }
        },
        dataZoom: [{
          show: true,
          type: 'inside',
          filterMode: 'none',
          xAxisIndex: [0],
          startValue: -20,
          endValue: 20
        }, {
          show: true,
          type: 'inside',
          filterMode: 'none',
          yAxisIndex: [0],
          startValue: -20,
          endValue: 20
        }],
        series: [
          {
            type: 'line',
            showSymbol: false,
            clip: true,
            data: generateData()
          }
        ]
      };

      option && myChart.setOption(option);
    }
  },
  created(){

  },
  mounted(){
    this.drawPic1();
    this.drawPic2();
    this.drawPic3();
    this.drawPic4();
  }
}
</script>

<style scoped>

</style>
