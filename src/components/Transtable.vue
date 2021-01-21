<!--  -->
<template>
  <div>
    <div>
      <Datatable :columns="columns" :data="data"></Datatable>
    </div>
  </div>
</template>

<script>
import Datatable from "@/components/common/Datatable.vue"
import {getTransaction} from "@/network/home";

const columns = [


  {
    title: '交易时间',
    dataIndex: 'closeTime',
    key: 'closeTime',
    align: 'center',
  },
  {
    title: '所属区块',
    dataIndex: 'seq',
    key: 'seq',
    align: 'center',

  },
  {
    title: '交易类型',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    customRender(type) {
      let config={
        'createAccount':'创建账号',
        'ssuerAsset':'发行资产',
        'payAsset':'转移资产',
        'payCoin':'转账',
        'record':'存证',
        'useContract':'调用合约',
        'setAuthority':'设置权限',
        'complex':'多类型组合',
      }
      return config[type];
    }
  },
  {
    title: '源账户',
    dataIndex: 'sourceAddress',
    key: 'sourceAddress',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '目的账户',
    dataIndex: 'toac',
    key: 'toac',
    ellipsis: true,
    align: 'center',
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
    align: 'center',
    ellipsis: true,
  },
  {
    title: '状态',
    dataIndex: 'statue',
    key: 'statue',
    align: 'center',
  },
];


export default {
  name: "Transtable",

  components: {Datatable},

  data() {
    return {
      columns,
      data: [],
      count:0


    };

  },

  props: {},

  created() {
    this.tabledata();
  },


  computed:{
    pagination(){
      return{
        defaultCurrent: 1,
        total: this.count,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        showSizeChanger: true,
        showQuickJumper: true,

      }
    }

  },


  methods: {
    tabledata() {
      getTransaction().then(res => {
        console.log(res);
        this.data = res.result;
        this.count = res.count;
      })
    }
  },
}


</script>
<style lang='less' scoped>


</style>