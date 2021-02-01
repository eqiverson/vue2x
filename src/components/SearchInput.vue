<template>
  <div id="search">
    <input
      type="search"
      v-model="Searchresult"
      placeholder="请输入区块高度值/区块哈希值/交易哈希/账号地址"
      @keydown="SearchAction"
    />
  </div>
</template>

<script>
import _ from "underscore";
import { getLedger, getTransaction, getAccount } from "@/network/home";

export default {
  name: "SearchInput",
  data() {
    return {
      Searchresult: [],
    };
  },
  methods: {
    
     SearchAction: _.throttle( async function (e) {
      const inputValue = e.target.value;
      //   this.Searchresult = this.multidata.filter((item) =>{
      //   if (item.course_name.includes(inputValue)){
      //     return item;
      //   }

      // })

      switch (typeof inputValue) {
        case number:
          if(await getLedger({ seq: s }).length != 0)
          this.router.push({ name: "blockdetail", params: { inputValue } });
          else
          this.router.push({ path: "/404" });
          break;

        case string:

          const arr1 = getLedger({ hash: inputValue });
          const arr2 = getTransaction({ hash: inputValue });
          const arr3 = getAccount({ address: inputValue });

          await arr1;
          await arr2;
          await arr3;

          if(await getLedger({ hash: inputValue }.length !=0)

              this.router.push({ name: "blockdetail", params: { inputValue } });
          else if()
           this.router.push({ path: "/404" });
              getTransaction({ hash: inputValue })
                .then((res) => {
                  this.router.push({
                    name: "transctiondetail",
                    params: { inputValue },
                  });
                })
                .catch((err) => {
                  getAccount({ address: inputValue })
                    .then((res) => {
                      this.router.push({
                        name: "accountdetail",
                        params: { inputValue },
                      });
                    })
                    .catch((err) => {
                      this.router.push({ path: "/404" });
                    });
                });
            });

          break;
      }
    }, 1000),

    async blockseq(s) {
      getLedger({ seq: s })
        .then((res) => {
          this.router.push({ name: "blockdetail", params: { inputValue } });
        })
        .catch((err) => {
          this.router.push({ path: "/404" });
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#search {
  width: 540px;
  height: 40px;
  margin: 50px auto 100px;
  line-height: 20px;
  text-align: center;

  input {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    line-height: 30px;
    padding: 5px 45px 5px 50px;
    font-size: 18px;
    border: none;
    border-radius: 20px;
    background-color: hsla(0, 0%, 100%, 0.5);
    outline: none;
    color: #2b3a78;
  }
}
</style>