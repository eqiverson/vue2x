<!--  -->
<template>
  <div>
    <Transtable  :data="data" :pagination="pagination"></Transtable>
  </div>
</template>

<script>
import Transtable from "@/components/Transtable.vue";
import {getTransaction} from "@/network/home";



export default {
  data() {
    return {
      count:0,
      data:[],
    };
  },

  created() {
    this.gettabledata();
  },

  components: { Transtable },

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

  methods: {
    gettabledata() {
      getTransaction({}).then((res) => {
        console.log(res);
        this.data = res.result;
        this.count = res.count;
      });
    },
  },
};
</script>
<style lang='scss' scoped>
</style>