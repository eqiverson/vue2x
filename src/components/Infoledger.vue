<!--  -->
<template>
  <div id="info">
    <!-- <a-row type="flex" justify="center" class="infobox">
      <div >
        <div class="data">11</div>
        <div class="title">区块</div>
      </div>
      <a-col :span="4" class="title"> 区块 </a-col>
      <a-col :span="4" class="title"> 区块 </a-col>
      <a-col :span="4" class="title"> 区块 </a-col>
    </a-row> -->

    <div class="infobox">
      <a-row type="flex" justify="center" align="middle">
        <a-col :span="6" class="infobox-item" @click="linktolastblocks">
          <div class="data">{{ seq }}</div>
          <div class="title">当前区块高度</div>
        </a-col>
        <a-col :span="6" class="infobox-item" @click="linktoaccounts">
          <div class="data">{{ accountCount }}</div>
          <div class="title">总账号数</div>
        </a-col>
        <a-col :span="6" class="infobox-item" @click="linktotrans">
          <div class="data">{{ txCount }}</div>
          <div class="title">总交易数</div>
        </a-col>
        <!-- <a-col :span="4" class="infobox-item">
          <div class="data">{{ applicationCount }}</div>
          <div class="title">接入应用数</div>
        </a-col> -->
        <a-col :span="6" class="infobox-item" @click="linktonodes">
          <div class="data">{{ nodeCount }}</div>
          <div class="title">实时节点数</div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { getLedger } from "@/network/home";

export default {
  name: "Infoledger",
  data() {
    return {
      seq: "-",
      accountCount: "-",
      txCount: "-",
      applicationCount: "-",
      nodeCount: "-",
    };
  },

  created() {
    this.infodata();
  },

  methods: {
    linktolastblocks() {
      this.$router.push({ name: "lastblock", params: { seq: seq } });
    },
    linktoaccounts() {
      this.$router.push({ name: "accounts" });
    },
    linktotrans() {
      this.$router.push({ name: "Transaction" });
    },
    linktonodes() {
      this.$router.push({ name: "Nodes" });
    },

    infodata() {
      getLedger({}).then((res) => {
        this.seq = res.result[0].seq;
        this.accountCount = res.result[0].accountCount;
        this.txCount = res.result[0].txCount;
        this.applicationCount = res.applicationCount;
        this.nodeCount = res.nodeCount;
        console.log(res);
      });
    },
  },

  components: {},

  computed: {},
};
</script>
<style lang='less' scoped>
#info {
  // padding: 20px;
  // margin: 0 auto;
  // align-items: center;
  // width: 1920px;

  .infobox {


    .infobox-item {
      text-align: center;
      cursor: pointer;

      .title {
        color: #fcfafa;
        font-size: 16px;
      }
      .data {
        color: #fcfafa;
        font-size: 28px;
      }
    }
  }
}
</style>