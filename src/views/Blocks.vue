<template>
  <div>
    <Blocktable @changepage="changepage"  :data="data" :pagination="pagination"></Blocktable>
  </div>
</template>

<script>
import Blocktable from "@/components/Blocktable.vue"
import { getLedger } from "@/network/home";





export default {
  data () {
    return {
      count:0,
      data:[],
    };
  },

  created() {
    this.gettabledata();
  },

  components: {Blocktable,},

  computed:{
    pagination(){
      return{
        defaultCurrent: 1,
        total: this.count,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        showSizeChanger: true,
        showQuickJumper: true,

      }
    }

  },


  methods: {
    gettabledata() {
      getLedger({}).then((res) => {
        console.log(res);
        this.data = res.result;
        this.count = res.count;
      });
    },

    changepage(n){
      console.log(n);
      getLedger({page:n}).then((res) => {
      this.pagination = n;
        console.log(res);
        this.data = res.result;
        this.count = res.count;
    })
  }
  }
}

</script>
<style lang='scss' scoped>
</style>