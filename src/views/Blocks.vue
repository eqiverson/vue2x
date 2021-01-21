<template>
  <div>
    <Blocktable></Blocktable>
  </div>
</template>

<script>
import Blocktable from "@/components/Blocktable.vue"
import {getTransaction} from "@/network/home";

export default {
  data () {
    return {
      pagination:
          {total:80},

    };
  },

  components: {Blocktable,},

  computed: {},


  methods: {}
}

</script>
<style lang='scss' scoped>
</style>