<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图-->
    <el-card>
      <!--echarts区域-->
      <div id="main" style="width: 800px;height: 600px">

      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Report",
  data(){
    return{

    }
  },
  methods: {
    setEcharts(){
      let echarts = require('echarts');//导入echarts
      let myChart = echarts.init(document.getElementById('main'));//初始化echarts实例

      this.$ajax.get('report/type/1').then(({data: result}) => {
        if(!result.flag){
          return this.$message.error(result.msg);
        }

        console.log(result.data);
        const {data} = result;

        let seriesArray = [];
        data.forEach(item => {
          seriesArray.push({
            name: item.rp1Area,
            type: 'line',
            stack: '总量',
            data: item.userCountList
          });
        });

        let labelList = [];
        data.forEach(item => {
          labelList.push(item.rp1Area);
        });

        // 指定图表的配置项和数据
        let option = {
          title: {
            text: '用户数据'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: labelList
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2017-12-27', '2017-12-28', '2017-12-29', '2017-12-30', '2017-12-31', '2018-01-01']
          },
          yAxis: {
            type: 'value'
          },
          series: seriesArray
        };

        myChart.setOption(option);

      }).catch(err => console.log(err));
    }

  },
  created(){

  },
  mounted(){
    this.setEcharts();
  },


}
</script>

<style scoped>

</style>
