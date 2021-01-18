<template>
  <div class="home">
    home
    <div id="main" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script>
// @ is an alias to /src

import { getLedger, getHomeGoods } from "@/network/home";

const echarts = require("echarts");



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

      myChart


    };
  },
  created() {
    this.infodata();

    myChart.setOption(option);
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
  },


computed:{
      // myChart = echarts.init(document.getElementById("main"))
}
}
</script>
