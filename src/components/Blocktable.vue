<template>

  <div id="table">
    <a-table
        :columns="columns"
        :data-source="data"
        :pagination="pagination"
        @change="handlechange"  >
      <template slot="seq" slot-scope="text">
        <router-link :to="{ name:'blockdetail' , params:{ block:text }}">{{ text }}</router-link>
      </template>
    </a-table>
  </div>

</template>

<script>

const


export default {

  name: "Blocktable",


  components: {},

  data() {
    return {
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