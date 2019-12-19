<template>
  <div class="navgation">
    <section class="navBar top">
      <p class="navBar__title">管理平台</p>
      <section class="navBar__lists" @click="handleHrefHost">
        <p class="navBar__lists--item" data-name="allHost">全部主机({{hostCount.totalCount}})</p>
        <p class="navBar__lists--item" data-name="freeHost">空闲主机池({{hostCount.freeCount}})</p>
        <p class="navBar__lists--item" data-name="baseFacilty">企业基础设施({{hostCount.infrHostCount}})</p>
      </section>
    </section>
    <section class="nav__main">
      <section class="nav__right">
        <el-menu
          class="sidebar-container"
          default-active="0"
          background-color="#2f3b52"
          text-color="#fff"
          active-text-color="#ffd04b">
           <el-submenu :index="changeIndex(firstIndex)" v-for="(first, firstIndex) in projectList" :key="firstIndex+'hostFirst'">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{first.name}}</span>
            </template>
            <el-menu-item :index='hostFirstIndex+"hostFirst"' v-for="(hostFirst, hostFirstIndex) in setNavHostList(first.totalCount, first.freeCount, first.infrCount)" :key="hostFirstIndex+'second'" @click="setHostList(first.id, hostFirst.name)">{{hostFirst.name}}({{hostFirst.count}})</el-menu-item>
            <el-menu-item-group v-for="(second, secondIndex) in first.children" :key="secondIndex">
              <el-submenu :index="changeIndex(firstIndex, secondIndex)">
                <template slot="title">{{second.name}}</template>
                <el-menu-item :index='hostSecondIndex+"hostSecond"' v-for="(hostSecond, hostSecondIndex) in setNavHostList(second.totalCount, second.freeCount, second.infrCount)" :key="hostSecondIndex+'second'" @click="setHostList(second.id, hostSecond.name)">{{hostSecond.name}}({{hostSecond.count}})</el-menu-item>
              </el-submenu>
            </el-menu-item-group>
           </el-submenu>
        </el-menu>
      </section>
      <nuxt/>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      hostCount: {},
      projectList: [],
      navHostObj: {
        0: '全部主机',
        1: '空闲主机池',
        2: '企业基础设施'
      },
      changeHostName: {
        '全部主机': 'allHost',
        '空闲主机池': 'freeHost',
        '企业基础设施': 'baseFacilty'
      }
    }
  },
  methods: {
    ...mapActions(['setHostUrl']),
    getDefaultCount() {
      this.$axios.$get('/api/host/count').then(res => {
        this.hostCount = res.data
      })
    },
    handleHrefHost (e) {
      if (e.target.nodeName.toLowerCase() === 'p') {
        const name = e.target.dataset.name
        const url = `/api/hostList/0?type=${name}`
        this.setHostUrl(url)
      }
    },
    getProjectList () {
      this.$axios.$get('/api/projectList').then(res => {
        this.projectList = res
      })
    },
    changeIndex (...val) {
      if (val.length === 1) {
        return `${val[0]}`
      }
      return `${val[0]}-${val[1]}`
    },
    setNavHostList (...val) {
      const navHostArr = []
      val.forEach((item, index) => {
        if (item > 0) {
          navHostArr.push({
            name: this.navHostObj[index],
            count: item
          })
        }
      })
      return navHostArr
    },
    setHostList (id, name) {
      const url = `/api/hostList/${id}?type=${this.changeHostName[name]}`
      this.setHostUrl(url)
    }
  },
  created () {
    this.getProjectList()
    this.getDefaultCount()
  }
}
</script>

<style lang="less" scope>
.sidebar-container{
  width: 200px;
  height: calc(100vh - 60px);
  overflow-y: auto;
}
.navgation{
  overflow: hidden;
}
.top{
  height: 60px;
  padding: 0 30px 0 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}
.nav__main{
  display: flex;
  margin-top: 60px;
}
.nav__right{
  background-color: #2f3b52;
  color: #fff;
}
.navBar{
  position: fixed;
  z-index: 2;
  width: 97vw;
  font-size: 16px;
  background: #3a4750;
  color: #fff;
  &__lists{
    min-width: 400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &--item:active{
      color: #ffd04b;
    }
  }
}
</style>