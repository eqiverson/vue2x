<!--  -->
<template>
  <div>
    <Transtable :pagination="pagination"></Transtable>
  </div>
</template>

<script>
import Transtable from "@/components/Transtable.vue";
export default {
  data () {
    return {
      pagination:
      {total:80},
      
    };
  },

  components: {Transtable,},

  computed: {},


  methods: {}
}

</script>
<style lang='scss' scoped>
</style>