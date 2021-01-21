<!--  -->
<template>
  <div>

    <div>
    <Datatable :columns="columns" :data="data" ></Datatable>
    </div>
  </div>
</template>

<script>
import Datatable from "@/components/common/Datatable.vue"
import {  getTransaction } from "@/network/home";

const columns = [

  {
    title: '交易时间',
    dataIndex: 'closeTime',
    key: 'closeTime',
    align:'center',
  },
  {
    title: '所属区块',
    dataIndex: 'seq',
    key: 'seq',
    align:'center',

  },
  {
    title: '交易类型',
    dataIndex: 'type',
    key: 'type',
    align:'center',
  },
  {
    title: '源账户',
    dataIndex: 'sourceAddress',
    key: 'sourceAddress',
    ellipsis: true,
    align:'center',
  },
  {
    title: '目的账户',
    dataIndex: 'toac',
    key: 'toac',
    ellipsis: true,
    align:'center',
  },
  {
    title: '所属应用',
    dataIndex: 'applicationName',
    key: 'applicationName',
    ellipsis: true,
  },
  {
    title: '交易哈希',
    dataIndex: 'hash',
    key: 'hash',
    align:'center',
    ellipsis: true,
  },
  {
    title: '状态',
    dataIndex: 'statue',
    key: 'statue',
    align:'center',
  },
];



export default {
  name:"Transtable",

  components: {Datatable},

  data () {
    return {
      columns,
      data:[],

      
    };

  },

  props: {
  },

  created () {
    this.tabledata();
  },



  computed: {},


  methods: {
    tabledata(){
      getTransaction().then(res => {
        console.log(res);
        this.data = res.result;
      })
    }
  },
}


</script>
<style lang='less' scoped>


</style>