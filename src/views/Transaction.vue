<!--  -->
<template>
  <div>
    <Datatable @changepage="changepage"  :columns="columns" :data="data" :pagination="pagination"></Datatable>
  </div>
</template>

<script>
import Datatable from "@/components/common/Datatable.vue";
import {getTransaction} from "@/network/home";



export default {
  data() {
    return {
      count:0,
      data:[],
      columns: [
        {
          title: "交易时间",
          dataIndex: "closeTime",
          key: "closeTime",
          align: "center",
          width: "15%",
        },
        {
          title: "所属区块",
          dataIndex: "seq",
          key: "seq",
          align: "center",
          width: "10%",
        },
        {
          title: "交易类型",
          dataIndex: "type",
          key: "type",
          align: "center",
          width: "10%",
          customRender(type) {
            let config = {
              createAccount: "创建账号",
              createContract: "创建合约",
              issuerAsset: "发行资产",
              payAsset: "转移资产",
              payCoin: "转账",
              record: "存证",
              useContract: "调用合约",
              setAuthority: "设置权限",
              complex: "多类型组合",
            };
            return config[type];
          },
        },
        {
          title: "源账户",
          dataIndex: "sourceAddress",
          key: "sourceAddress",
          ellipsis: true,
          align: "center",
          scopedSlots: { customRender: "sourceAddress" },
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
          title: "交易哈希",
          dataIndex: "hash",
          key: "hash",
          align: "center",
          ellipsis: true,
          scopedSlots: { customRender: "transhash" },
        },
        {
          title: "状态",
          dataIndex: "status",
          key: "status",
          align: "center",
          width: "10%",
          customRender(status) {
            return status == "success" ? "成功" : "不成功";
          },
        },
      ],
    };
  },

  created() {
    this.gettabledata();
  },

  components: { Datatable },

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

    changepage(n){
      console.log(n);
      getTransaction({page:n}).then((res) => {
      this.pagination = n;
        console.log(res);
        this.data = res.result;
        this.count = res.count;
    })
  },

  }
};
</script>
<style lang='scss' scoped>
</style>