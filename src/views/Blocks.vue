<template>
  <div>
    <Datatable @changepage="changepage"  :columns="columns" :data="data" :pagination="pagination"></Datatable>
  </div>
</template>

<script>
import { getLedger } from "@/network/home";
import Datatable from "@/components/common/Datatable.vue";




export default {
  data () {
    return {
      count:0,
      data:[],
      columns :[
        {
          title: "区块高度",
          dataIndex: "seq",
          key: "seq",
          align: "center",
          scopedSlots: { customRender: 'block' },
        },
        {
          title: '生成时间',
          dataIndex: 'closeTime',
          key: 'closeTime',
        },
        {
          title: '区块版本',
          dataIndex: 'version',
          key: 'version',
        },
        {
          title: '区块大小',
          key: 'size',
          dataIndex: 'size',
        },
        {
          title: '块哈希',
          key: 'hash',
          dataIndex: 'hash',
          scopedSlots: { customRender: 'block' },
          ellipsis: true,
        },
      ],
    };
  },

  created() {
    this.gettabledata();
  },

  components: {Datatable},

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