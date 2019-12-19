<template>
  <div class="wrapper">
    <search :searchGroup='searchForm' v-on:searching="handleSearch"></search>
    <section class="tableWrapper">
      <el-table style="width: 100%" stripe border :data="hostTableList" v-loading='loading'>
        <el-table-column :prop="item.prop" :label="item.label" v-for="(item, index) in hostTableConfig" :key="index" :width="item.width"></el-table-column>
      </el-table>
      <pagination :pagination='pagination' v-on:sizeChange="handlePagination"></pagination>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import pagination from '../components/pagination'
import search from '../components/search'
export default {
  layout: 'nav',
  data() {
    return {
      searchParams: {
        page: 1,
        per_page: 20,
        keyword: '',
        selectTag: ''
      },
      hostTableConfig: [
        {
          label: '外网IP',
          prop: 'hostIp'
        },
        {
          label: '内网IP',
          prop: 'localIp'
        },
        {
          label: '分类标签',
          prop: 'categoryTag'
        },
        {
          label: '主机状态',
          prop: 'status'
        },
        {
          label: '所属业务分组',
          prop: 'group',
          width: '200px'
        }
      ],
      searchForm: [
        [
          {
            id: '11',
            keyword: '',
            label: '内/外网ip',
            type: 'input'
          },
          {
            id: '12',
            keyword: '',
            label: '分类标签',
            type: 'select',
            options: [
              {
                label: '链接',
                id: '1'
              },
              {
                label: '失联',
                id: '2'
              }
            ]
          }
        ]
      ],
      loading: false
    }
  },
  computed: {
    hostTableList () {
      return this.$store.state.hostTableList
    },
    pagination () {
      return this.$store.state.paginationConfig
    },
    hostUrl () {
      return this.$store.state.hostUrl
    }
  },
  watch: {
    hostUrl () {
      this.fetchHostTableList(this.hostUrl)
    }
  },
  components: {
    pagination,
    search
  },
  methods: {
    ...mapActions(['setHostTableList', 'setPaginationConfig', 'setHostUrl']),
    handlePagination (type, val) {
      if (type === 'currentChange') {
        this.searchParams.per_page = val
      } else {
        this.searchParams.page = val
      }

    },
    fetchHostTableList (url) {
      this.$axios.get(url).then(res => {
        this.setHostTableList(res.data.data)
        this.setPaginationConfig(res.data.pagination)
      })
    },
    changeUrlPath (path) {
      let url = path
      const keys = Object.keys(this.searchParams)
      if (path.indexOf('?') !== -1) {
        let query = url.split('?')
        if (query[1].indexOf('&') !== -1) {
          let queryOne = query[1].split('&')[0]
          url = query[0] + '?' + queryOne
        }
        keys.forEach(item => {
          url = url + `&${item}=${this.searchParams[item]}`
        })
      } else {
        keys.forEach((item, index) => {
          if (index === 0) {
            url = url + `?${item}=${this.searchParams[item]}`
          } else {
            url = url + `&${item}=${this.searchParams[item]}`
          }
        })
      }
      return url
    },
    handleSearch () {
      this.searchParams.keyword = this.searchForm[0][0].keyword
      this.searchParams.selectTag = this.searchForm[0][1].keyword
      this.setHostUrl(this.changeUrlPath(this.hostUrl))
    }
  },
  created () {
    this.fetchHostTableList(this.hostUrl)
  },
}
</script>
<style lang="less">
.wrapper {
  .tableWrapper {
    padding: 24px;
    width: calc(100vw - 260px);
  }
}
</style>
