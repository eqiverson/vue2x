<template>
  <div id="search">
    <input
      type="search"
      v-model="Searchresult"
      placeholder="请输入区块高度值/区块哈希值/交易哈希/账号地址"
      @keyup.enter="SearchAction"
    />
    <div>{{Searchresult}}</div>
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
      let inputValue = e.target.value;
      let reg = /^[0-9]*[1-9][0-9]*$/ ;

       let that = this;

      if ( reg.test(inputValue) )
      {
        let   n =  parseInt(inputValue);

        let arr1 = await getLedger({ seq: inputValue }).then((res) => {return res==null?null:res.result});
          console.log(arr1);
         console.log(n);
         console.log(typeof(n));
          console.log(n>0);
          console.log(n<9223372036854775807);
          console.log(arr1.length != 0);

      if(n>0 && n<9223372036854775807 && arr1.length != 0)
          that.$router.push({ name: "blockdetail", params: { block:n } });
          else
          that.$router.push({ path: "/404" });
      }
      

        else
        {

          let arr4 = await getAccount({ address: inputValue }).then((res) => {return res});
        let arr2 = await getLedger({ hash: inputValue }).then((res) => {return res==null?null:res.result});
        let arr3 = await getTransaction({ hash: inputValue }).then((res) => {return res.result.length==0?null:res.result});

      console.log(inputValue.length);
          console.log(arr2);
          console.log(arr3);
          console.log(arr4);

         switch (inputValue.length){

          //查询账号
         case 36:
           if (arr4.length!=0)
           that.$router.push({ name: "accountdetail" , params: { account:inputValue } });
          else
          that.$router.push({ path: "/404" });
          break;

          //先查询是否区块哈希，再查询交易哈希
          case 64:

          if (arr2.length==0&&arr3.length==0)
          that.$router.push({ path: "/404" });
          else if (arr2.length!=0)
          that.$router.push({ name: "blockdetail", params: { block:inputValue } });
          else
          that.$router.push({ name: "transctiondetail", params: { hash:inputValue }});

          break;

          default:
      that.$router.push({ path: "/404" });
      break;
         }

         }
   
           
    }, 1000),


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