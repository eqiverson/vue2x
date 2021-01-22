<template>

  <div id="table">
    <a-table :columns="columns" :data-source="data" :pagination="pagination"  >
      <a slot="name" slot-scope="text">{{ text }}</a>

    </a-table>


  </div>

</template>

<script>




export default {

  name: "Blocktable",


  components: {},

  data() {
    return {
    };

  },

    props: {
    columns: Array,
    data: Array,
    pagination:
    {
    type:Object,
      default:function (){
        return false;
        },
  },
  },




  methods: {

  },


}

</script>


<style type="text/scss" lang="less" scoped>


</style>