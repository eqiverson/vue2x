<template>
  <div class="home">
    home
    <div id="bbb" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script>
// @ is an alias to /src

import { getLedger } from "@/network/home";


// let echarts = require("echarts/lib/echarts");
// // 按需引入需要的组件模块
// require("echarts/lib/chart/line");
// require("echarts/lib/component/title");
// require("echarts/lib/component/legend");
// require("echarts/lib/component/tooltip");

const echarts = require('echarts');


export default {
  name: "Home",
  data() {
    return {
      option: {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      },

      seq: [],
      accountCount: [],
      txCount: [],
      applicationCount: [],
      nodeCount: [],



    };
  },
  created() {
    this.infodata();


  },


  methods: {
    infodata() {
      getLedger().then((res) => {
        this.seq = res.result[0].seq;
        this.accountCount = res.result[0].accountCount;
        this.txCount = res.result[0].txCount;
        this.applicationCount = res.applicationCount;
        this.nodeCount = res.nodeCount;
      });
    },

    getecharts(){

      let chart = echarts.init(document.getElementById("bbb"));
      chart.setOption(this.option);
    }
  },

mounted() {
  this.getecharts();
},


  computed:{
      // myChart = echarts.init(document.getElementById("main"))
}
}
</script>
