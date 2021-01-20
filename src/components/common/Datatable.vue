<template>
  <div>
  <a-table :columns="columns" :data-source="data" :pagination="{
    defaultCurrent:1,
    total:85,
    showSizeChanger:true,
    defaultCurrent:1,
    showTotal:  (total , range) => `${range[0]}-${range[1]} of ${total} items`,
    showQuickJumper:true,



           }">
    <a slot="name" slot-scope="text">{{ text }}</a>

  </a-table>
<!--  <a-pagination class="pagination"-->
<!--      :total="85"-->
<!--      :show-total="(total, range) => `${range[0]}-${range[1]} of ${total} items`"-->
<!--      :page-size="20"-->
<!--      :default-current="1"  show-size-changer show-quick-jumper-->
<!--  />-->

  </div>
</template>
<script>






export default {
  name:'Datatable',
  data() {
    return {
      data:[],
      columns:[],

    }
  },
  props: {
    columns: Array,
    data: Array,
  },

};
</script>


<style lang='less' scoped>
 #table{
   padding: 15px;

  //  overflow: hidden;
 }

 .pagination{
   float: right;

   }::after{
       content:" ";
       display:block;
       clear:both;
     }
</style>