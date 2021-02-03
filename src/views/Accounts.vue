<template>

  <div>

    <div>
      <Datatable @changepage="changepage"  :columns="columns" :data="data" :pagination="pagination"></Datatable>
    </div>

  </div>

</template>


<script>


import { getAccount } from "@/network/home";
import Datatable from "@/components/common/Datatable.vue";

export default {

  name: "Accounts.vue",

  // props: [],

  components: { Datatable },

  data() {

    return {
      count:0,
      data:[],
      columns : [

        {
          title: "账号地址",
          dataIndex: "address",
          key: "address",
          ellipsis: true,
          align: "center",
          scopedSlots: { customRender: 'sourceAddress' },
        },
        // {
        //   title: "交易时间",
        //   dataIndex: "closeTime",
        //   key: "closeTime",
        //   align: "center",
        //   width:'15%',
        // },
        // {
        //   title: "所属区块",
        //   dataIndex: "seq",
        //   key: "seq",
        //   align: "center",
        //   width:'10%',
        // },
        {
          title: "账号类型",
          dataIndex: "type",
          key: "type",
          align: "center",
          width:'10%',
          customRender(type) {
            let config = {
              contract: "合约账户",
              account: "普通账户",
            };
            return config[type];
          },
        },

        // {
        //   title: "目的账户",
        //   dataIndex: "toac",
        //   key: "toac",
        //   ellipsis: true,
        //   align: "center",
        // },
        // {
        //   title: "所属应用",
        //   dataIndex: "applicationName",
        //   key: "applicationName",
        //   ellipsis: true,
        // },
        {
          title: "总交易量",
          dataIndex: "involvedOperationCount",
          key: "involvedOperationCount",
          align: "center",
          ellipsis: true,
        },
        // {
        //   title: "状态",
        //   dataIndex: "status",
        //   key: "status",
        //   align: "center",
        //   width:'10%',
        //   customRender (status){ return status=='success'? '成功' : '不成功'}
        // },
      ],
    };

  },

  created() {
    this.gettabledata();
  },

  methods: {
    gettabledata() {
      getAccount({}).then((res) => {
        console.log(res);
        this.data = res.result;
        this.count = res.count;
      });
    },

        changepage(n){
      console.log(n);
      getAccount({page:n}).then((res) => {
      this.pagination = n;
        console.log(res);
        this.data = res.result;
        this.count = res.count;
    })
  }
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