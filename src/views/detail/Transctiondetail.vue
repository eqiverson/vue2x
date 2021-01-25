<!--  -->
<template>
  <div>
    <div class="container">
      <a-divider orientation="left"> 交易： </a-divider>
      <div id="detail">
        <div>
          <a-row  type="flex" >
            <a-col  :span="3" :offset="2">交易时间</a-col>
            <a-col  :span="10">{{}}</a-col>
          </a-row>
          <a-row type="flex">
            <a-col  :span="3" :offset="2">区块高度</a-col>
            <a-col :flex ="10">{{}}</a-col>
          </a-row>
          <a-row type="flex">
            <a-col :flex="2">交易类型</a-col>
            <a-col :flex="3">{{}}</a-col>
          </a-row>
          <a-row type="flex">
            <a-col :flex="2">源账户</a-col>
            <a-col :flex="3">{{}}</a-col>
          </a-row>
          <a-row type="flex">
            <a-col :flex="2">签名者</a-col>
            <a-col :flex="3">{{}}</a-col>
          </a-row>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="title">
        操作：（操作指创建账号、存证、调用合约、发行资产、资产转移等）
      </div>
      <div class="tag">存证</div>
      <div class="detail">
        <div>
          <div>操作源账户地址</div>
          {{}}
          <div>存证索引key</div>
          {{}}
          <div>存证内容</div>
          {{}}
          <div>资产代码</div>
          {{}}
          <div>源账户</div>
          {{}}
          <div>签名者</div>
          {{}}
        </div>
      </div>
    </div>

    {{ $route.params.hash }}
  </div>
</template>

<script>
export default {
  name: "Transctiondetail",
  data() {
    return {};
  },

  components: {},

  computed: {},

  methods: {},
};
</script>
<style lang='less' scoped>
#detail {
  // text-align: center;
  margin-left: 30px;
}
</style>