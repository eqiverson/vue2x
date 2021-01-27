<!--  -->
<template>
  <div id="list-demo" class="demo">

  <transition-group name="list" tag="p">
    <span v-for="item in items" v-bind:key="item" class="list-item">
      {{ item }}
    </span>
  </transition-group>
</div>
</template>

<script>
export default {
  data () {
    return {
     items: [1,2,3,4,5],
    nextNum1: 6,
    nextNum2: 7,

    };
  },
    created() {
    this.transition1();
  },

  components: {},

  computed: {},



  methods: {
    transition1() {

      setInterval(() => {
        this.nextNum1=this.nextNum1+2;
        this.nextNum2=this.nextNum2+2;
            this.items.splice(this.items.length, 0, this.nextNum1,this.nextNum2);
            this.items.splice(0, 2);
      }, 1000);
    },
  }
  }


</script>
<style lang='less' scoped>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-30px);
}

</style>