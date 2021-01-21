import {request} from "./request";

//###### 5.1 查询区块生成记录
// export function getLedger() {
//   return request({
//     data:{},
//     url: '/v1/getLedger',

//   })
// }

export function getLedger(params) {
  return request({
    data:{},
    url: '/v1/getLedger',
    params
  })
}

// export function getLedger1(params) {
//   return request({
//     data:{},
//     url: '/v1/getLedger',
//     params
//   })
// }


//###### 5.2 查询交易执行记录
export function getTransaction(params) {
  return request({
    data:{},
    url: '/v1/getTransaction',
    params

  })
}

//###### 5.6 查询账户信息
export function getAccount(params) {
  return request({
    data:{},
    url: '/v1/getAccount',
    params

  })
}

//###### 5.7 查询接入应用信息
export function getApplication(params) {
  return request({
    data:{},
    url: '/v1/getApplication',
    params

  })
}

//###### 5.8 查询节点状态
export function getNode(params) {
  return request({
    data:{},
    url: '/v1/getNode',
    params

  })
}

export function getTransactionStatistics(params) {
  return request({
    data:{},
    url: '/v1/getTransactionStatistics',
    params

  })
}

export function getAccountCount(params) {
  return request({
    data:{},
    url: '/v1/getAccountCount',
    params

  })
}





// export function getHomeGoods(type, page) {
//   return request({
//     url: '/home/data',
//     params: {
//       type,
//       page
//     }
//   })
// }

// 函数调用 -> 压入函数栈(保存函数调用过程中所有变量)
// 函数调用结束 -> 弹出函数栈(释放函数所有的变量)
// function test() {
//   const names = ['why', 'aaa']
// }
//
// test()
//
// test()

// let totalNums = []

// const nums1 = [20, 11, 222]
// const nums2 = [111, 22, 333]

// for (let n of nums1) {
//   totalNums.push(n)
// }

// totalNums.push(...nums1)
