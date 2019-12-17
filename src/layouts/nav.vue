<template>
  <div>
    <section class="navBar top">
      <p class="navBar__title">管理平台</p>
      <section class="navBar__lists">
        <p class="navBar__lists--item">全部主机(12)</p>
        <p class="navBar__lists--item">空闲主机池(2)</p>
        <p class="navBar__lists--item">企业基础设施(3)</p>
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

<style lang="less" scope>
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
}
.nav__right{
  width: 190px;
  height: 100vh;
  text-align: center;
  background-color: #2f3b52;
  color: #fff;
}
.navBar{
  font-size: 16px;
  background: #3a4750;
  color: #fff;
  &__lists{
    width: 400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>