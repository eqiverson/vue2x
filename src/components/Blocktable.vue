<template>

  <div id="table">
    <a-table
        :columns="columns"
        :data-source="data"
        :pagination="pagination"
        @change="handlechange"  >
      <a slot="search" slot-scope="text">{{ text }}</a>     
    </a-table>
  </div>

</template>

<script>

const columns = [
  {
    title: "区块高度",
    dataIndex: "seq",
    key: "seq",
    align: "center",
    scopedSlots: { customRender: 'search' },
  },
  {
    title: '生成时间',
    dataIndex: 'closeTime',
    key: 'closeTime',
  },
  {
    title: '区块版本',
    dataIndex: 'version',
    key: 'version',
  },
  {
    title: '区块大小',
    key: 'size',
    dataIndex: 'size',
  },
  {
    title: '块哈希',
    key: 'hash',
    dataIndex: 'hash',
    scopedSlots: { customRender: 'search' },
    ellipsis: true,
  },
];


export default {

  name: "Blocktable",


  components: {},

  data() {
    return {
      columns
    };

  },

    props: {
    data: Array,
    pagination:
    {
    // type:Object,
      default:function (){
        return false;
        },
  },
  },




  methods: {
  handlechange(pagination) {
      console.log(pagination.current);
      this.$emit("changepage",pagination.current);
    }
  },


}

</script>


<style type="text/scss" lang="less" scoped>


</style>