<template>

  <div>

    <div>
      <Accountstable  :data="data" :pagination="pagination"></Accountstable>
    </div>

  </div>

</template>


<script>

import Accountstable from "@/components/Accountstable.vue";
import {getApplicationTurnover, getTransaction} from "@/network/home";

export default {

  name: "Accounts.vue",

  // props: [],

  components: { Accountstable },

  data() {

    return {
      count:0,
      data:[],
    };

  },

  created() {
    this.gettabledata();
  },

  methods: {
    gettabledata() {
      getApplicationTurnover({}).then((res) => {
        console.log(res);
        this.data = res.result;
        this.count = res.count;
      });
    },
  },

  // mounted() {
  //
  //
  // }

  computed: {
    pagination() {
      return {
        defaultCurrent: 1,
        total:this.count,
        showTotal: (total, range) =>
            `${range[0]}-${range[1]} 共 ${total} 条`,
        showSizeChanger: true,
        showQuickJumper: true,
      };
    },
  },

}

</script>


<style type="text/scss" lang="less" scoped>


</style>