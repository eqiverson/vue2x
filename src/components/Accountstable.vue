<!--  -->
<template>
  <div>
    <div id="table">
    <a-table
        :columns="columns"
        :data-source="data"
        :pagination="pagination"
        @change="handlechange"  >
      <template slot="address" slot-scope="text"> 
        <router-link :to="{ name:'accountdetail' , params:{ account:text }}">{{ text }}</router-link>
      </template>
      </a-table>
    </div>

  </div>
</template>

<script>


const


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
  name: "Accountdetail",

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