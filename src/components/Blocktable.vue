<template>
  <div>
    <div>
      <Datatable :columns="columns" :data="data" :pagination="pagination"></Datatable>
    </div>
  </div>
</template>

<script>
import Datatable from "@/components/common/Datatable.vue"
import {getTransaction} from "@/network/home";

const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' },
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default {

  name: "Blocktable",

  props: [],

  components: {Datatable},

  data() {
    return {
      columns,
      data,



    };

  },

  computed:{
    pagination(){
      return{
        defaultCurrent: 1,
        total: 88,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        showSizeChanger: true,
        showQuickJumper: true,

      }
    }

  },
  methods: {

  },


}

</script>


<style type="text/scss" lang="less" scoped>


</style>