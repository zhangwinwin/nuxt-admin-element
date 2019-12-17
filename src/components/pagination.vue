<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pagination.current_page"
    :page-size="20"
    :page-sizes="[20, 50, 80]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pagination.total"
  ></el-pagination>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('sizeChange', 'sizeChange', val)
    },
    handleCurrentChange (val) {
      this.$emit('currentChange', 'currentChange', val)
    }
  }
}
</script>