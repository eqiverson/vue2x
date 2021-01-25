<!--  -->
<template>
  <div>
  <div id="table">
    <a-table
        :columns="columns"
        :data-source="data"
        :pagination="pagination"
        @change="handlechange"  >
      <a slot="sourceAddress" slot-scope="text">{{ text }}</a>     
    </a-table>
  </div>
  
  </div>
</template>

<script>


const columns = [
  {
    title: "交易时间",
    dataIndex: "closeTime",
    key: "closeTime",
    align: "center",
    width:'15%',
  },
  {
    title: "所属区块",
    dataIndex: "seq",
    key: "seq",
    align: "center",
    width:'10%',
  },
  {
    title: "交易类型",
    dataIndex: "type",
    key: "type",
    align: "center",
    width:'10%',
    customRender(type) {
      let config = {
        createAccount: "创建账号",
        createContract: "创建合约",
        issuerAsset: "发行资产",
        payAsset: "转移资产",
        payCoin: "转账",
        record: "存证",
        useContract: "调用合约",
        setAuthority: "设置权限",
        complex: "多类型组合",
      };
      return config[type];
    },
  },
  {
    title: "源账户",
    dataIndex: "sourceAddress",
    key: "sourceAddress",
    ellipsis: true,
    align: "center",
    scopedSlots: { customRender: 'sourceAddress' },
  },
  // {
  //   title: "目的账户",
  //   dataIndex: "toac",
  //   key: "toac",
  //   ellipsis: true,
  //   align: "center",
  // },
  // {
  //   title: "所属应用",
  //   dataIndex: "applicationName",
  //   key: "applicationName",
  //   ellipsis: true,
  // },
  {
    title: "交易哈希",
    dataIndex: "hash",
    key: "hash",
    align: "center",
    ellipsis: true,
    scopedSlots: { customRender: 'sourceAddress' },
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    align: "center",
    width:'10%',
    customRender (status){ return status=='success'? '成功' : '不成功'}
  },
];


//  customRender: renderContent // 渲染函数的规则
//       }, {
//         title: '搜索关键词',
//         dataIndex: 'keyword',
//         customRender: (text, row, index) => {
//             if (index < 4) { // 前4行数据以a标签的形式被渲染
//               return <a href="javascript:;">{text}</a>
//             }
//             return { // 否则以独占4列的文本形式被渲染
//               children: text,
//               attrs: {
//                 colSpan: 4
//               }



export default {
  name: "Transtable",

  components: {},

  data() {
    return {
      columns
    };

  },

  props: {
    data: Array,


    pagination:{
    // type:Object,
    default:function (){
        return false;
        },
    }
  },




  computed:{
  },


  methods: {
  handlechange(pagination) {
      console.log(pagination.current);
      this.$emit("changepage",pagination.current);
    }
  },
}


</script>
<style lang='less' scoped>


</style>