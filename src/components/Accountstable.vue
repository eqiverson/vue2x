<!--  -->
<template>
  <div>
    <div id="table">
      <a-table :columns="columns" :data-source="data" :pagination="false"  >
        <a slot="sourceAddress" slot-scope="text">{{ text }}</a>
      </a-table>
    </div>

  </div>
</template>

<script>


const columns = [

  {
    title: "账号地址",
    dataIndex: "address",
    key: "address",
    ellipsis: true,
    align: "center",
    scopedSlots: { customRender: 'sourceAddress' },
  },
  // {
  //   title: "交易时间",
  //   dataIndex: "closeTime",
  //   key: "closeTime",
  //   align: "center",
  //   width:'15%',
  // },
  // {
  //   title: "所属区块",
  //   dataIndex: "seq",
  //   key: "seq",
  //   align: "center",
  //   width:'10%',
  // },
  {
    title: "账号类型",
    dataIndex: "type",
    key: "type",
    align: "center",
    width:'10%',
    customRender(type) {
      let config = {
        contract: "合约账户",
        account: "普通账户",
      };
      return config[type];
    },
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
    title: "总交易量",
    dataIndex: "involvedOperationCount",
    key: "involvedOperationCount",
    align: "center",
    ellipsis: true,
  },
  // {
  //   title: "状态",
  //   dataIndex: "status",
  //   key: "status",
  //   align: "center",
  //   width:'10%',
  //   customRender (status){ return status=='success'? '成功' : '不成功'}
  // },
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
      type:Object,
      default:function (){
        return false;
      },
    }
  },




  computed:{
  },


  methods: {
  },
}


</script>
<style lang='less' scoped>


</style>