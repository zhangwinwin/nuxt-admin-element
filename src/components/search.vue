<template>
  <section class="searchWrapper">
    <div class="search__container">
      <div class="search__column" v-for="(searchList, index) in searchGroup" :key="index">
        <div class="search__column--item" v-for="searchItem in searchList" :key="searchItem.id">
          <strong>{{searchItem.label}}</strong>
          <el-input v-model="searchItem.keyword" v-if="searchItem.type === 'input'"></el-input>
          <el-select  placeholder="请选择" v-model="searchItem.keyword" clearable v-if="searchItem.type === 'select'">
            <el-option v-for="pick in searchItem.options"
              :key="pick.id"
              :label="pick.label"
              :value="pick.id"></el-option>
          </el-select>
        </div>
      </div>
      <div class="search__btns">
        <div class="search__btns--item">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    searchGroup: {
      type: Array
    }
  },
  methods: {
    handleSearch () {
      this.$emit('searching')
    }
  }
}
</script>

<style lang="less">
.searchWrapper{
  .search__container{
    padding: 20px 24px 0; 
  }
  .search__column{
    display: flex;
    align-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
  .search__column--item{
    flex: 1;
    strong{
      display: inline-block;
      width: 100px;
    }
    .el-select, .el-input{
      width: calc(100% - 120px);
    }
    .el-select{
      .el-input{
        width: 100%;
      }
    }
  }
  .search__btns{
    display: flex;
    padding: 5px 0;
    justify-content: center;
  }
  .search__btns--item{
    width: 150px;
    margin-bottom: 15px;
    .el-button{
      width: 100%;
    }
  }
}
</style>