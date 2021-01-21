<template>
  <div id="table">
  <a-table :columns="columns" :data-source="data" :pagination="pagination"  >
    <a slot="name" slot-scope="text">{{ text }}</a>

  </a-table>


  </div>
</template>
<script>






export default {
  name:'Datatable',
  data() {
    return {
    }
  },
  props: {
    columns: Array,
    data: Array,
    pagination:{
      Object,
      default: function () {
        return {
          
    defaultCurrent:1,
    total:0,
    showSizeChanger:true,
    defaultCurrent:1,
    showTotal:  (total , range) => `${range[0]}-${range[1]} of ${total} items`,
    showQuickJumper:true,
    loading:'loading',
  };
  }
    },

},

methods :{
  },
}

</script>


<style lang='less' scoped>

 #table{
   padding: 15px;


 }


</style>