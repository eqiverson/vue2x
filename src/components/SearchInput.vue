<template>
  <div id="search">
    <input
      type="search"
      v-model="Searchresult"
      placeholder="请输入区块高度值/区块哈希值/交易哈希/账号地址"
      @keyup.enter="SearchAction"
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

       searchseq( i ) {
        return getLedger({ seq: i }).then((res) =>{return res});
      },
    
     SearchAction: _.throttle( async function (e) {
      let inputValue = e.target.value;
      
      
      let arr1 = await getLedger({ seq: inputValue }).then((res) => {return res.result});
      let arr2 = await getLedger({ hash: inputValue });
        let arr3 = await getTransaction({ hash: inputValue });
         let arr4 = await getAccount({ address: inputValue });

          // await arr1;
          // await arr2;
          // await arr3;
          // await arr4;

          console.log(arr1);
          console.log(arr2);
          console.log(arr3);
          console.log(arr4);
          console.log(typeof(parseInt(inputValue)));
          console.log(inputValue>0);
          console.log(inputValue<9223372036854775807);
          console.log(arr1.length != 0);

      //   this.Searchresult = this.multidata.filter((item) =>{
      //   if (item.course_name.includes(inputValue)){
      //     return item;
      //   }

      // })
            switch (typeof(parseInt(inputValue))) {
        case number:
        let   n =  parseInt(inputValue);
      if(n>0 && n<9223372036854775807 && arr1.length != 0)
          this.router.push({ name: "blockdetail", params: { inputValue } });
          else
          this.router.push({ path: "/404" });
          break;



        case NaN:

         switch (inputValue.length){

          //查询账号
         case 32:
           if (arr4.result.length!=0)
           this.router.push({ name: "accountdetail" , params: { inputValue }, });
          else
          this.router.push({ path: "/404" });
          break;

          //先查询是否区块哈希，再查询交易哈希
          case 64:

          if (arr2.result.length==0&&arr3.result.length==0)
          this.router.push({ path: "/404" });
          else if (arr2.result.length!=0)
          this.router.push({ name: "blockdetail", params: { inputValue } });
          else
          this.router.push({ name: "transctiondetail", params: { inputValue }});

          break;

          default:
      this.router.push({ path: "/404" });
      break;

         }
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