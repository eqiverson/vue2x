### 接口
#### 1 接口概述
#### 2 术语和定义
1、地址
通常指区块链账户的地址,36位长可见字符串，参考：ccs3FJFui7uLbpmizEqfVyY2Z77c2ydS6CBa
2、合约地址
指合约账户的地址
3、资产唯一标识
资产code+发行商地址组成资产唯一标识
4、交易hash
交易请求报文序列化后进行hash并以16进行字符串编码后的值，64位长可见字符串，参考：dea83f99ab2078cadedfeb7d57cd1a2724f1417d087b2426db8a64411900006b
#### 3 接口鉴权
    暂无
#### 4 接口规范
##### 4.1 协议规定
用户接入区块链服务，调用API必须遵循以下规则

|   内容        | 说明 |
| :-------------        | -----------------------------------------  |
| 传输方式          | 为保证交易安全性，采用HTTPS传输 |
| 提交方式 | 提交和返回数据都为json格式 |
| 字符编码 | 统一采用UTF-8字符编码 |
|  ~~签名算法~~  | ~~MD5/HMAC-SHA256~~ |
|   ~~签名要求~~  | ~~请求需要校验签名，详细方法请参考接口鉴权~~|
|   判断逻辑  | 先判断协议字段返回，再判断业务返回，最后判断交易状态 |


##### 4.2 参数规定
##### 4.3 公共参数
###### 4.4 响应通用
如无特别说明，每次请求响应结果中，都会包含如下字段：

| 参数 |类型  |描述  | 
| --- | --- | --- | 
| status | bool | 响应状态（取值：true=成功、false=失败） |  
| code |String  | 错误代码 |  
| message |String  | 错误描述 |  
| data | Object | 响应结果 | 

#### 5 API列表
###### 5.1 查询区块生成记录
    HTTP POST application/json /v1/getLedger
+ 接口描述
    + 该接口返回区块头部信息以及区块链系统的一部分运行状态信息。默认返回最新前十条区块生成记录。
 + 请求参数说明

| 参数          |必填 | 类型 |描述                                      |
| :------------- | ---| ---- |----------------------------------------------------- |
| seq    | 否| long |区块号 |
| hash  | 否 | String | 区块hash|
| version | 否| int |区块版本 |
| closeTimeStart | 否| Date | 区块关闭时间大于这个值的区块，格式为（YYYY-MM-DD HH:MM:SS） |
| closeTimeEnd  | 否 | Date | 区块关闭小于这个值的区块，格式为（YYYY-MM-DD HH:MM:SS） |
| page  | 否 | int | 开始位置，page从1开始，若不填，默认page的大小是1 |
| pageSize  | 否 | int | 数量大小，最大值是1000，若不填，默认pageSize的大小是10 |

* 返回data参数说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| page | int | 当前页码 |
| pageSize | int | 每页行数 |
| pageCount | int | 页数总计 |
| count | int | 记录总数 |
| result | Array | 区块集合信息 |
| applicationCount | int | 接入的应用总数 |
| nodeCount | int | 区块链网络拥有的节点数 |

* 返回result参数说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| seq | long | 区块号 |
| hash | String | 区块hash |
| version | int |区块版本  |
| latestTxCount | int | 当前区块交易量 |
| txCount | Long | 所有区块的交易量总和 |
| registeredAccounts | int | 当前区块新增账户数 |
| accountCount | Long | 账户总数 |
| closeTime | Date | 区块关闭时间 格式（YYYY-MM-DD HH:MM:SS） |
| size | long | 区块大小,单位byte |
| validatorCount | int | 参与共识的节点数 |
| previousHash | String | 上一个区块hash |
| consensusValueHash | String | 共识hash |
| accountTreeHash | String | 账户树hash |


###### 5.2 查询交易执行记录
    HTTP POST application/json /v1/getTransaction
+ 接口描述
   + 该接口是用于批量查询交易记录
   
 + 请求参数说明

| 参数          |必填 | 类型 |描述                                      |
| :------------- | ---| ---- |----------------------------------------------------- |
|  seq   | 否| long | 区块号 |
|  hash   | 否| String | 交易的hash |
|  sourceAddress   | 否| String |交易发起者账户地址 |
|  type   | 否| String | 交易类型（createAccount=创建账号、issuerAsset=发行资产、payAsset=转移资产、record=存证、payCoin=转账、useContract=调用合约、setAuthority=设置权限、complex=多类型组合） |
| applicationName | 否  | String  | 交易发起者所属应用名称 |
| applicationID  | 否 | String | 交易发起者所属应用ID |
|   closeTimeStart  | 否| Date |交易生成时间大于这个值的交易，格式为（YYYY-MM-DD HH:MM:SS） |
|   closeTimeEnd  | 否| Date |交易生成时间小于这个值的交易，格式为（YYYY-MM-DD HH:MM:SS） |
| isOperation | 否| bool | 是否返回交易中的详细操作内容，默认false |
| isSigners | 否| bool| 是否返回该交易签名者账户地址列表，默认false|
| page  | 否 | int | 开始位置，page从1开始，若不填，默认page的大小是1 |
| pageSize  | 否 | int | 数量大小，最大值是1000，若不填，默认pageSize的大小是10 |

* 返回data参数说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| page | int | 当前页码 |
| pageSize | int | 每页行数 |
| pageCount | int | 页数总计 |
| count | int | 记录总数 |
| result | Array | 交易集合信息 |

* 返回result数组的值对象说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| status  | String | 交易执行状态（success=成功、failed=失败、wait=等待）  |
| hash |String  | 交易hash |
| closeTime  | Date | 交易生成时间，格式为（YYYY-MM-DD HH:MM:SS） |
| seq  | long | 交易所属区块号 |
| sourceAddress  |String  | 交易发起者地址  |
| type  | String | 交易类型（createAccount=创建账号、issuerAsset=发行资产、payAsset=转移资产、payCoin=转账、record=存证、useContract=调用合约、setAuthority=设置权限、complex=多类型组合) |
| applicationName  | String  | 交易发起者所属应用名称 |
| applicationID  | String | 交易发起者所属应用ID |
| remarks  | String | 交易备注 |
| operationCount  | int | 该交易操作个数 |
| operations  | Array | operation操作列表 |
| signers  | Array  | signer签名者列表 |

* 返回operation参数说明（根据操作类型不同返回的字段也有所差别）

* 返回createAccount对象参数说明（根据操作类型不同返回的字段也有所差别）

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| opeType |String  | 操作类型createAccount=创建账号） |
| opeSourceAddress |String  | 操作的源地址 |
| destAddress |String  | 被创建的目标账户  |
| isContract |int  | 是否为合约账户 |
| payLoad |String  | 合约代码 |
| initInput | String  | 创建合约的初始参数  |
| masterWeight |int  | 账户拥有权重 |
| txThreshold |int  | 发起交易最低权重 |
| thresholdPayAsset |int  | 转移资产所需权重 |
| thresholdIssuerAsset |int  | 发行资产所需权重 |
| thresholdCreateAccount |int  | 创建账户所需权重 |
| thresholdPayCoin |int  | 转账/调用合约所需权重  |
| thresholdSetAuthority |int  | 设置权限所需权重  |
| setSignerCount |int  | 设置权重的账户数 |

* 返回issuerAsset对象参数说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| opeType |String  | 操作类型issuerAsset=发行资产 |
| opeSourceAddress |String  | 操作源账户地址 |
| issuer |String  | 发行商账户地址 |
| assetCode |String  | 资产代码 |
| amount |long  | 发行数量 |

* 返回payAsset对象参数说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| opeType |String  | 操作类型payAsset=转移资产 |
| opeSourceAddress |String  | 操作源账户地址 |
| destAddress |String  | 接收资产账户地址 |
| issuer |String  | 发行商账户地址 |
| assetCode |String  | 资产代码 |
| amount |long  | 发行数量 |

* 返回record对象参数说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| opeType |String  | 操作类型record=存证 |
| opeSourceAddress |String  | 操作源账户地址 |
| key |String  | 存证索引key |
| value |String  | 存证内容 |
| version |int  | 资产代码 |

* 返回payCoin对象参数说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| opeType |String  | 操作类型payCoin=转账 |
| opeSourceAddress |String  | 操作源账户地址 |
| destAddress |String  | 接收资产目标地址 |
| amount |long  | 转移数量 |


* 返回useContract对象参数说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| opeType |String  | 操作类型useContract=调用合约 |
| opeSourceAddress |String  | 操作源账户地址 |
| destAddress |String  | 合约地址 |
| amount |long  | 转移数量 |
| input |String  | 合约参数 |

* 返回signer参数说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| address |String  | 签名的账户地址 |
| weight |String  | 签名者的权重 |
| applicationID |String  |所属应用ID  |
| applicationName |String  | 所属应用名称 |



###### 5.3 查询发行资产交易执行记录
    HTTP POST application/json /v1/getIssuerAssetTransaction
+ 接口描述
   + 该接口是用于批量查询资产的发行记录
   
 + 请求参数说明

| 参数          |必填 | 类型 |描述                                      |
| :------------- | ---| ---- |----------------------------------------------------- |
|  issuer   | 否| String | 资产发行商 |
|  assetCode   | 否 | String | 资产code |
| applicationName | 否  | String  | 交易发起者所属应用名称 |
| applicationID  | 否 | String | 交易发起者所属应用ID |
|   closeTimeStart  | 否| Date |交易生成时间大于这个值的交易，格式为（YYYY-MM-DD HH:MM:SS） |
|   closeTimeEnd  | 否| Date |交易生成时间小于这个值的交易，格式为（YYYY-MM-DD HH:MM:SS） |
| page  | 否 | int | 开始位置，page从1开始，若不填，默认page的大小是1 |
| pageSize  | 否 | int | 数量大小，最大值是1000，若不填，默认pageSize的大小是10 |

* 返回data参数说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| page | int | 当前页码 |
| pageSize | int | 每页行数 |
| pageCount | int | 页数总计 |
| count | int | 记录总数 |
| result | Array | 发行记录集合信息 |

* 返回result数组的值对象说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| seq | long | 区块号 |
| hash | String | 交易hash |
|amount| long | 发行数量|
|issuer | String | 发行商  |
|assetCode | String | 资产代码  |
| applicationName |  String  | 交易发起者所属应用名称 |
| applicationID  | String | 交易发起者所属应用ID |
|closeTime | Date | 发行日期时间，格式为（YYYY-MM-DD HH:MM:SS）  |

###### 5.4 查询账户参与签名的交易执行记录 （未完成）
    HTTP POST application/json /v1/getSignTransaction
+ 接口描述
   + 该接口是用于批量查询账户参与签名的交易记录
   
 + 请求参数说明

| 参数          |必填 | 类型 |描述                                      |
| :------------- | ---| ---- |----------------------------------------------------- |
| address  | 是 | String |参与交易的账户地址 |
| applicationName | 否  | String  | 交易发起者所属应用名称 |
| applicationID  | 否 | String | 交易发起者所属应用ID |
|   closeTimeStart  | 否| Date |交易生成时间大于这个值的交易，格式为（YYYY-MM-DD HH:MM:SS） |
|   closeTimeEnd  | 否| Date |交易生成时间小于这个值的交易，格式为（YYYY-MM-DD HH:MM:SS） |
| page  | 否 | int | 开始位置，page从1开始，若不填，默认page的大小是1 |
| pageSize  | 否 | int | 数量大小，最大值是1000，若不填，默认pageSize的大小是10 |

* 返回data参数说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| page | int | 当前页码 |
| pageSize | int | 每页行数 |
| pageCount | int | 页数总计 |
| count | int | 记录总数 |
| result | Array | 参与签名的交易集合信息 |

* 返回result数组的值对象说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| hash | String | 交易hash |
| data | String | 签名前交易数据 |
| signData | String | 签名后值 |
| weight | String | 占有的权重 |

###### 5.5 查询账户参与的交易记录（未完成）
    HTTP POST application/json /v1/getAccountJoinTransaction
+ 接口描述
   + 该接口是用于批量查询用户参与的交易记录
   
 + 请求参数说明

| 参数          |必填 | 类型 |描述                                      |
| :------------- | ---| ---- |----------------------------------------------------- |
|  address   | 是| String |账户地址 |
|  seq   | 否| long | 区块号 |
|  type   | 否| String | 交易类型（createAccount=创建账号、issuerAsset=发行资产、payAsset=转移资产、record=存证、payCoin=转账、useContract=调用合约、setAuthority=设置权限、complex=多类型组合） |
|   closeTimeStart  | 否| Date |交易生成时间大于这个值的交易，格式为（YYYY-MM-DD HH:MM:SS） |
|   closeTimeEnd  | 否| Date |交易生成时间小于这个值的交易，格式为（YYYY-MM-DD HH:MM:SS） |
| page  | 否 | int | 开始位置，page从1开始，若不填，默认page的大小是1 |
| pageSize  | 否 | int | 数量大小，最大值是1000，若不填，默认pageSize的大小是10 |

* 返回data参数说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| page | int | 当前页码 |
| pageSize | int | 每页行数 |
| pageCount | int | 页数总计 |
| count | int | 记录总数 |
| result | Array | 交易集合信息 |

* 返回result数组的值对象说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| hash | String | 交易hash |
|  seq   | long | 区块号 |
|  type   |  String | 交易类型|
| applicationName |  String  | 交易发起者所属应用名称 |
| applicationID  | String | 交易发起者所属应用ID |
| closeTime | Date | 交易执行时间，格式为（YYYY-MM-DD HH:MM:SS）  |


###### 5.6 查询账户信息
    HTTP POST application/json /v1/getAccount
+ 接口描述
   + 该接口是用于批量查询账户信息，包括合约账户。
   
 + 请求参数说明

| 参数          |必填 | 类型 |描述                                      |
| :------------- | ---| ---- |----------------------------------------------------- |
|  address   | 否| String | 账户地址 |
|  parentAddress   | 否| String | 创建目标账户的账户地址 |
|  hash   | 否| String | 生成该账户的hash |
|  type   | 否| String | 账户类型（contract=合约账户，account=普通账户） |
| applicationName| 否 | String  | 账户所属应用名称 |
| applicationID| 否  | String | 账户所属应用ID |
|   seq  | 否| String | 该区块下创建的账户 |
|   closeTimeStart  | 否| Date |账户生成时间大于这个值的账户，格式为（YYYY-MM-DD HH:MM:SS） |
|   closeTimeEnd  | 否| Date |账户生成时间小于这个值的账户，格式为（YYYY-MM-DD HH:MM:SS） |
| page  | 否 | int | 开始位置，page从1开始，若不填，默认page的大小是1 |
| pageSize  | 否 | int | 数量大小，最大值是1000，若不填，默认pageSize的大小是10 |

* 返回data参数说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| page | int | 当前页码 |
| pageSize | int | 每页行数 |
| pageCount | int | 页数总计 |
| count | int | 记录总数 |
| result | Array | 账户集合信息 |

* 返回result数组的值对象说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| address  | String | 账户地址  |
| parentAddress |String  | 创建目标账户的账户地址 |
| hash  | String | 生成该账户的hash |
| type  | String | 账户类型（contract=合约账户，account=普通账户） |
| applicationName|  String  | 账户所属应用名称 |
| applicationID|  String | 账户所属应用ID |
|   seq  | String | 该区块下创建的账户 |
|   createTime  | Date | 创建时间，格式为（YYYY-MM-DD HH:MM:SS） |
|   lastTxHash  | String | 该账户最后一次发起的交易hash |
|   lastTxTime  | Date | 该账户最后一次发起的交易的时间，格式为（YYYY-MM-DD HH:MM:SS） |
| assetCount |Int|资产种类总数 |
| txCount |Long| 发起的交易总数 |
| involvedOperationCount |Long| 参与的操作交易总数 |
| involvedSignTransaction |Long| 参与签名交易总数 |
| recordCount |Long| 存证总数 |
|  contract    |String| 合约代码，若没有则为null |
| size|  String | 合约大小，单位byte |
|   invokingHash  | String | 最近一次调用合约的交易hash |
|   invokingAddress  | String | 最近一次调用合约的账户地址 |
|   invokingTime  | String | 最近一次调用合约的时间 |
|   masterWeight   |Long| 自身权重|
|   txThreshold   |int | 发起交易所需权重|
|   txThresholdCreateAccount   |int| 创建账号权重，若没有则为0|
|   txThresholdIssuerAsset   |int| 	发行资产权重，若没有则为0|
|   txThresholdPayAsset   |int|转移资产权重，若没有则为0 |
|   txThresholdRecord   |int| 设置metadata权重，若没有则为0|
|   txThresholdPayCoin   |int| 转账/调用合约权重，若没有则为0|
|    txThresholdAuthority  |int| 设置权限权重，若没有则为0 |
|     signers |Array|其他账号对本账号发起交易所拥有的权重值 |

* 返回signer参数说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| address |String  | 签名的账户地址 |
| weight |String  | 签名者的权重 |
| ~~applicationID~~ |String  |所属应用ID  |
| ~~applicationName~~ |String  | 所属应用名称 |

###### 5.7 查询接入应用信息
    HTTP POST application/json /v1/getApplication

+ 接口描述
   + 该接口是用于批量查询接入的应用信息。
   
 + 请求参数说明

| 参数          |必填 | 类型 |描述                                      |
| :------------- | ---| ---- |----------------------------------------------------- |
| applicationName| 否 | String  | 应用名称 |
| applicationID| 否  | String | 应用ID |
| applicationType| 否  | String | 应用类型（inside=平台应用、external=外部应用） |
| applicationStatus| 否  | String | 应用状态（start=启动、stop=关闭） |
|   closeTimeStart  | 否| Date |账户生成时间大于这个值的账户，格式为（YYYY-MM-DD HH:MM:SS） |
|   closeTimeEnd  | 否| Date |账户生成时间小于这个值的账户，格式为（YYYY-MM-DD HH:MM:SS） |
| page  | 否 | int | 开始位置，page从1开始，若不填，默认page的大小是1 |
| pageSize  | 否 | int | 数量大小，最大值是1000，若不填，默认pageSize的大小是10 |

* 返回data参数说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| page | int | 当前页码 |
| pageSize | int | 每页行数 |
| pageCount | int | 页数总计 |
| count | int | 记录总数 |
| result | Array | 应用集合信息 |

* 返回result数组的值对象说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| applicationName|  String  | 应用名称 |
| applicationID| String | 应用ID |
| applicationType| String | 应用类型（inside=平台应用、external=外部应用） |
| applicationStatus| String | 应用状态（start=启动、stop=关闭） |
| applicationCreateTime| Date | 应用接入时间，格式为（YYYY-MM-DD HH:MM:SS） |
| accountAddress | String | 该应用的初始账号 |
| txCount | long | 该应用交易总数 |
| accountCount | int | 该应用创建的账户总数（包括合约账户） |
|contractCount | int | 合约账户数 |
|assetCount | int | 持有资产种类总数 |
|recordCount |  long | 存证数量 |
|recordSize | long  | 存证总大小，单位byte |

###### 5.8 查询节点状态
    HTTP POST application/json /v1/getNode
    
+ 接口描述
   + 该接口是用于批量查询节点状态。
   
 + 请求参数说明

| 参数          |必填 | 类型 |描述                                      |
| :------------- | ---| ---- |----------------------------------------------------- |
| nodeID| 否 | String  | 节点ID |
| nodeName| 否  | String | 节点名称 |
| status | 否  | String | 节点状态（start=运行、download=正在同步、stop=关闭） |
| isValidator  | 否  | bool | 是否只查询验证节点，默认false |
| page  | 否 | int | 开始位置，page从1开始，若不填，默认page的大小是1 |
| pageSize  | 否 | int | 数量大小，最大值是1000，若不填，默认pageSize的大小是10 |

* 返回data参数说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| page | int | 当前页码 |
| pageSize | int | 每页行数 |
| pageCount | int | 页数总计 |
| count | int | 记录总数 |
| result | Array | 节点集合信息 |

* 返回result数组的值对象说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| nodeID|  String  | 节点ID |
| nodeName| String | 节点名称 |
| status |  String | 节点状态（start=运行、download=正在同步、stop=关闭） |
| type  |  String | 节点类型（validator=验证节点、committer=记账节点） |

###### 5.9 查询最新存证列表
    HTTP POST application/json /v1/getRecordList
+ 接口描述
   + 该接口是用于批量存证信息。
   
 + 请求参数说明

| 参数          |必填 | 类型 |描述                                      |
| :------------- | ---| ---- |----------------------------------------------------- |
| applicationName| 否 | String  | 应用名称 |
| applicationID| 否  | String | 应用ID |
| address| 否 | String  | 账户地址 |
| key| 否  | String | 存证的key，账户下唯一 |
| page  | 否 | int | 开始位置，page从1开始，若不填，默认page的大小是1 |
| pageSize  | 否 | int | 数量大小，最大值是1000，若不填，默认pageSize的大小是10 |

* 返回data参数说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| page | int | 当前页码 |
| pageSize | int | 每页行数 |
| pageCount | int | 页数总计 |
| count | int | 记录总数 |
| result | Array | 存证集合信息 |

* 返回result数组的值对象说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| address |  String  | 存证地址 |
| key| String | 存证Key |
| value | String | 最新存证value内容 |
| size | long | 最新存证value大小，单位byte |
| version | int | 最新的版本号 |
| updateTime | int | 最新一次更新时间 |
| hash | String | 最新一次更新的交易hash |
| applicationName|  String  | 所属应用名称 |
| applicationID|  String | 所属应用ID |

###### 5.10 查询存证详细信息
    HTTP POST application/json /v1/getRecord
+ 接口描述
   + 该接口是用于存证的详细信息以及以往的更新历史。
   
+ 请求参数说明

| 参数          |必填 | 类型 |描述                                      |
| :------------- | ---| ---- |----------------------------------------------------- |
| address| 是 | String  | 存证地址 |
| key| 是  | String | 存证Key |
| page  | 否 | int | 开始位置，page从1开始，若不填，默认page的大小是1 |
| pageSize  | 否 | int | 数量大小，最大值是1000，若不填，默认pageSize的大小是10 |

* 返回data参数说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| page | int | 当前页码 |
| pageSize | int | 每页行数 |
| pageCount | int | 页数总计 |
| address |  String  | 存证地址 |
| key | String | 存证Key |
| applicationName| String |  所属应用名称 |
| applicationID|String  |所属应用ID |
| version | int | 存证最新版本号 |
| count | int | 记录总数 |
| result | Array | 存证以往版本记录集合 |

* 返回result数组的值对象说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| seq| 否 | String  | 区块号 |
| version |  int  | 存证版本号 |
| createTime |  int  | 更新时间 |
| value |  Sting  | value内容 |
| size |  long  | value大小，单位byte |
| hash |  String  | 交易hash |

###### 5.11 查询资产列表
    HTTP POST application/json /v1/getAssetList
+ 接口描述
   + 该接口是用于查询资产种类。
   
 + 请求参数说明

| 参数          |必填 | 类型 |描述                                      |
| :------------- | ---| ---- |----------------------------------------------------- |
| type| 否  | String | 资产类型 |
| issuer| 否  | String | 发行方账户地址 |
| assetCode| 否  | String | 资产ID，资产ID+发行方地址组成全网唯一资产Key |
| page  | 否 | int | 开始位置，page从1开始，若不填，默认page的大小是1 |
| pageSize  | 否 | int | 数量大小，最大值是1000，若不填，默认pageSize的大小是10 |

* 返回data参数说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| page | int | 当前页码 |
| pageSize | int | 每页行数 |
| pageCount | int | 页数总计 |
| count | int | 记录总数 |
| result | Array | 资产集 |

* 返回result数组的值对象说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| type| String | 资产类型 |
| issuer|  String | 发行方账户地址 |
| assetCode|  String | 资产ID，资产ID+发行方地址组成全网唯一资产Key |
|count | long  | 发行总量 |
| turnover  |  long | 成交量 |
| updateTime | String  | 最新一次发行日期 | 
    
###### 5.12 查询资产持有者
    HTTP POST application/json /v1/getAsset
+ 接口描述
   + 该接口是用于查询资产种类。
   
 + 请求参数说明

| 参数          |必填 | 类型 |描述                                      |
| :------------- | ---| ---- |----------------------------------------------------- |
| issuer| 是  | String | 发行方账户地址 |
| assetCode| 是  | String | 资产ID，资产ID+发行方地址组成全网唯一资产Key |
| page  | 否 | int | 开始位置，page从1开始，若不填，默认page的大小是1 |
| pageSize  | 否 | int | 数量大小，最大值是1000，若不填，默认pageSize的大小是10 |

* 返回data参数说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| page | int | 当前页码 |
| pageSize | int | 每页行数 |
| pageCount | int | 页数总计 |
| type| String | 资产类型 |
| issuer|  String | 发行方账户地址 |
| assetCode|  String | 资产ID，资产ID+发行方地址组成全网唯一资产Key |
|assetCount | long  | 发行总量 |
| turnover  |  long | 成交量 |
| updateTime | Date  | 最新一次发行日期，格式为（YYYY-MM-DD HH:MM:SS） | 
| count | int | 记录总数 |
| result | Array | 持有者合集 |

* 返回result数组的值对象说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| address | String | 持有者账户地址 |
| amount|  String | 持有量 |

###### 5.13 查询持有者的资产列表
    HTTP POST application/json /v1/getAccountAssets
 + 接口描述
   + 该接口是用于查询资产种类。
   
 + 请求参数说明

| 参数          |必填 | 类型 |描述                                      |
| :------------- | ---| ---- |----------------------------------------------------- |
| address |是 | String | 持有者账户地址 |
| page  | 否 | int | 开始位置，page从1开始，若不填，默认page的大小是1 |
| pageSize  | 否 | int | 数量大小，最大值是1000，若不填，默认pageSize的大小是10 |

* 返回data参数说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| page | int | 当前页码 |
| pageSize | int | 每页行数 |
| pageCount | int | 页数总计 |
|seq|String | 区块号   | 
| count | int | 记录总数 |
| result | Array | 资产合集 |

* 返回result数组的值对象说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| type| String | 资产类型 |
| issuer|  String | 发行方账户地址 |
| assetCode|  String | 资产ID，资产ID+发行方地址组成全网唯一资产Key |
| amount|  String | 持有量 |


###### 5.14 查询合约账户状态
    HTTP POST application/json /v1/getContractStatus
 + 接口描述
   + 该接口是用于查询合约状态，包括该合约被调用的情况。
   
 + 请求参数说明

| 参数          |必填 | 类型 |描述                                      |
| :------------- | ---| ---- |----------------------------------------------------- |
| address |是 | String | 合约账户地址 |
| page  | 否 | int | 开始位置，page从1开始，若不填，默认page的大小是1 |
| pageSize  | 否 | int | 数量大小，最大值是1000，若不填，默认pageSize的大小是10 |

* 返回data参数说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| page | int | 当前页码 |
| pageSize | int | 每页行数 |
| pageCount | int | 页数总计 |
| count | int | 记录总数 |
| applicationName|  String  | 合约所属应用名称 |
| applicationID|  String | 合约所属应用ID |
| contract|  String | 合约代码 |
| size|  String | 合约大小，单位byte |
|   seq  | String | 该合约被创建时所在区块 |
| hash |String | 创建该合约的hash |
|   createTime  | Date | 合约创建时间，格式为（YYYY-MM-DD HH:MM:SS） |
|   invokingHash  | String | 最近一次调用合约的交易hash |
|   invokingAddress  | String | 最近一次调用合约的账户地址 |
|   invokingTime  | Date | 最近一次调用合约的时间，格式为（YYYY-MM-DD HH:MM:SS） |
| result | Array | 调用者信息合集 |

* 返回result数组的值对象说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| invokingAddress| String | 调用者账户地址 |
| input|  String | 调用时参数 |
| hash|  String | 调用该合约的交易hash |
| createTime|  Date | 调用时间，格式为（YYYY-MM-DD HH:MM:SS） |
| status|  String | 调用结果（succeff=成功、failed=失败） |

###### 5.15 查询一段时间内交易量
    HTTP POST application/json /v1/getTransactionStatistics
 + 接口描述
   + 该接口是用于统计区块链交易量，单位时间为天，默认返回最近几天的统计结果。
  + 请求参数说明

| 参数          |必填 | 类型 |描述                                      |
| :------------- | ---| ---- |----------------------------------------------------- |
| address |否 | String | 合约账户地址 |
| page  | 否 | int | 开始位置，page从1开始，若不填，默认page的大小是1 |
| pageSize  | 否 | int | 数量大小，最大值是1000，若不填，默认pageSize的大小是10 |

* 返回data参数说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| page | int | 当前页码 |
| pageSize | int | 每页行数 |
| pageCount | int | 页数总计 |
| count | int | 记录总数 |
| result | Array | 交易量合集 |

* 返回result数组的值对象说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| date|  Date  | 日期 |
| txCount|  Long | 交易量 |

###### 5.16 查询一段应用交易量排行
    HTTP POST application/json /v1/getApplicationTurnover
 + 接口描述
   + 该接口是用于统计应用的交易量，排序以交易量从高到低返回。
  + 请求参数说明

| 参数          |必填 | 类型 |描述                                      |
| :------------- | ---| ---- |----------------------------------------------------- |
| applicationName| 否 |  String  | 所属应用名称 |
| applicationID|否 | String | 所属应用ID |
| page  | 否 | int | 开始位置，page从1开始，若不填，默认page的大小是1 |
| pageSize  | 否 | int | 数量大小，最大值是1000，若不填，默认pageSize的大小是10 |

* 返回data参数说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| page | int | 当前页码 |
| pageSize | int | 每页行数 |
| pageCount | int | 页数总计 |
| count | int | 记录总数 |
| result | Array | 应用交易量合集 |

* 返回result数组的值对象说明

| 参数          | 类型 | 描述                                      |
| :------------- | ----------------------------------------- | ----------------------------------------- |
| applicationName|   String  | 所属应用名称 |
| applicationID| String | 所属应用ID |
| txCount|  Long | 交易量 |

#### 6 错误码


**提示：** 错误码由五位数字组成

| 异常          | 错误码 | 描述                      |
| ---------------------- | ------ | ------------------------ |
| SUCCESS      | 00000  | 操作成功        |
| FAILED        | 99999  | 未知错误 |