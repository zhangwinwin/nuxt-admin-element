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
        <p class="navBar__lists--item">全部主机(12)</p>
        <p class="navBar__lists--item">空闲主机池(2)</p>
        <p class="navBar__lists--item">企业基础设施(3)</p>
      </section>
      <nuxt/>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hostCount: {}
    }
  },
  methods: {
    getDefaultCount() {
      this.$axios.$get('/api/host/count').then(res => {
        this.hostCount = res.data
      })
    },
    handleHrefHost (e) {
      if (e.target.nodeName.toLowerCase() === 'p') {
        const name = e.target.dataset.name
        console.log(name)
      }
    }
  },
  created () {
    this.getDefaultCount()
  }
}
</script>

<style lang="less" scope>
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
  width: 190px;
  height: calc(100vh - 60px);
  text-align: center;
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
  }
}
</style>