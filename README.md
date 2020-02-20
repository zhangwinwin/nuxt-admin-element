# 基于nuxt构建的一个后台应用
## 项目介绍
后台应用包括三个部分：默认列表菜单、工程列表菜单和主要页面，如图所示：  
<img src="https://github.com/zhangwinwin/nuxt-admin-element/blob/master/src/assets/%E6%9E%B6%E6%9E%84.png">  
**目录**
```
src/
  ｜——components
        ｜——pagination.vue // 页码组件
        ｜——search.vue // 搜索组件
  ｜——layouts
        ｜——nav.vue // 布局组件
  ｜——pages
        ｜——index.vue // 主页
```
**接口**
接口是用yapi来mock的.为三个:  
// 获取默认列表数据
api/host/count
**返回数据**
|参数名|类型|说明|
|:-----  |:-----|:-----|
|totalCount |number   | 全部主机 |
|freeCount |number   |  空闲主机池|
|infrHostCount |number   | 企业基础设施 |

// 获取工程列表数据
api/projectList
**返回数据**
|参数名|类型|说明|
|:-----  |:-----|:-----|
|name |string   | 名称 |
|id |number   | id |
|totalCount |number   | 此id下全部主机 |
|freeCount |number   |  此id下空闲主机池|
|infrHostCount |number   | 此id下企业基础设施 |
|children |object   | 子结构 |
|name |string   | 名称 |
|id |number   | id |
|totalCount |number   | 此id下全部主机 |
|freeCount |number   |  此id下空闲主机池|
|infrHostCount |number   | 此id下企业基础设施 |
|children |object   | 子结构 |

// 获取列表数据
/api/hostList/:id
默认列表id为0，工程列表id为工程列表id

**Query**
|参数名|类型|说明|
|:-----  |:-----|:-----|
|keyword |string   | ip |
|page |number   |  页数|
|per_page |number   | 页码条数 |
|type |string   | 筛选type |
|selectTag |number   |  标签|

**返回数据**
|参数名|类型|说明|
|:-----  |:-----|:-----|
|data |object   |  |
|hostIp |string   |  主机ip|
|loaclIp |string   | 本地ip |
|categoryTag |string   | 标签 |
|status |number   |  状态|
|group |string   |  组别|
|pagination |objcet   | 页码信息 |
|total |number   | 总页数 |
|current_page |number   |  当前页|
|per_page |number   |  页码条数|


### vuex
```
state={
  hostTableList: [], // 页面列表信息
  paginationConfig: {} // 页面页码信息,
  hostUrl: '/api/hostList/0' // 请求列表信息Url
}
actions = {
  // 设置页面列表
  setHostTableList ({commit}, data) {
    commit(Types.GETHOSTTABLELIST, data)
  },
  // 设置页面页码
  setPaginationConfig ({commit}, data) {
    commit(Types.SETPAGINATIONCONFIG, data)
  },
  // 设置列表请求url
  setHostUrl ({commit}, data) {
    commit(Types.SETHOSTURL, data)
  }
}
 ```

## install
```
$ npm install
```

## Usage
```
$ npm run dev
```

## 详细介绍
页面列表数据默认是请求/api/hostList/0  
点击默认菜单：  
* 点击全部主机，请求URL：/api/hostList/0?type=allHost  
* 点击空闲主机池，请求url：/api/hostList/0?type=freeHost
* 点击企业基础设施，请求url：/api/hostList/0?type=baseFacilty

点击工程列表，则会获取列表中的id和type组成URL，比如：  
* 点击name:zdha,id:777的全部主机，请求URL：/api/hostList/777?type=allHost  

在页面里填写搜索条件,比如：点击了默认全部主机之后  
* 填写ip=‘192.1.1.0’，请求URL：/api/hostList/0?type=allHost&page=1&per_page&keyword=192.1.1.0&selectTa=  
* 选择标签，请求URL：请求URL：/api/hostList/0?type=allHost&page=1&per_page&keyword=192.1.1.0&selectTag=1
