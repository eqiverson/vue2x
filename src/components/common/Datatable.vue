<!--  -->
<template>
  <div>
  <div id="table">
    <a-table
        :columns="columns"
        :data-source="data"
        :pagination="pagination"

        @change="handlechange">
      <!-- <a slot="sourceAddress" slot-scope="text">{{ text }}</a>      -->
      <template slot="sourceAddress" slot-scope="text"> 
        <router-link :to="{ name:'accountdetail' , params:{ account:text }}">{{ text }}</router-link>
      </template>

      <template slot="transhash" slot-scope="text"> 
        <router-link :to="{ name:'transctiondetail' , params:{ hash:text }}">{{ text }}</router-link>
      </template>
      
      <template slot="block" slot-scope="text"> 
        <router-link :to="{ name:'blockdetail' , params:{  block:text }}">{{ text }}</router-link>
      </template>

    </a-table>
  </div>
  
  </div>
</template>

<script>





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
  name: "Datatable",

  components: {},

  data() {
    return {
      
    };

  },

  props: {
    data: Array,
    columns:Array,


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
    },

  },



}


</script>
<style lang='less' scoped>


  .bbb {
            font-size: 20px;
            background: #3071b9 !important;
  }
  

</style>