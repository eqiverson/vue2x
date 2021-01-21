<template>
  <div id="table">
    <a-table :columns="columns" :data-source="data" :pagination="pagination"  >
      <a slot="name" slot-scope="text">{{ text }}</a>

    </a-table>


  </div>
</template>
<script>


export default {
  name: 'Datatable',
  data() {
    return {}
  },
  props: {
    columns: Array,
    data: Array,
    pagination:{
    type:Boolean,
      default:false},





  },

  methods: {},
}

</script>


<style lang='less' scoped>

#table {
  padding: 15px;


}


</style>