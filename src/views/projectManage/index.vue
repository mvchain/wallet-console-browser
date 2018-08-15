<template>
  <div class="project-manage">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-date-picker
        v-model="rechargeTime"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        :default-time="['00:00:00', '23:59:59']"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        >
      </el-date-picker>
        <el-button @click="importFun">表格导出</el-button>
      </el-col>

      <el-col :span="8">
        <el-input v-model="searchTxt" placeholder="请输入交易hash、来源地址"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button @click="searchHandler">搜索</el-button>
      </el-col>
    </el-row>
    <div style="margin-top:30px;">
      <el-table
        border
        :data="recordList.list"
        style="width: 100%">
        <el-table-column
          prop="createdAt"
          label="时间">
        </el-table-column>
        <el-table-column

          prop="value"
          label="充值金额">
        </el-table-column>
        <el-table-column
          prop="fromAddress"
          width="550"
          label="来源地址">
        </el-table-column>
        <el-table-column
          prop="hash"
          width="600"
          label="交易哈希">
        </el-table-column>
      </el-table>
      <div style="margin-top:30px; text-align:center;">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="10"
          layout="prev, pager, next"
          :total="recordList.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { formatTime } from '@/utils'
  export default {
    name: 'projectIndex',
    data() {
      return {
        searchTxt: '',
        pageNum: 1,
        pageSize: 10,
        rechargeTime: '',
        startTime: '',
        stopTime: ''
      }
    },
    computed: {
      ...mapGetters({
        recordList: 'recordList'
      })
    },
    mounted() {
      this.getTableData(true)
    },
    methods: {
      getTableData(opt) {
        this.formatTime()
        let t = ''
        if (opt) {
          t = '?oprType=recharge&pageNum=1&pageSize=10'
        } else {
          if (this.searchTxt.trim().length >= 64) {
            t = `?oprType=recharge&pageNum=${this.pageNum}&pageSize=10&hash=${this.searchTxt}&startTime=${this.startTime}&stopTime=${this.stopTime}`
          } else {
            t = `?oprType=recharge&pageNum=${this.pageNum}&pageSize=10&fromAddress=${this.searchTxt}&startTime=${this.startTime}&stopTime=${this.stopTime}`
          }
        }
        this.$store.dispatch('getRecordList', t)
      },
      handleCurrentChange(c) {
        this.pageNum = c
        this.getTableData()
      },
      searchHandler() {
        this.getTableData()
      },
      formatTime() {
        if (Array.isArray(this.rechargeTime)) {
          this.startTime = formatTime(this.rechargeTime[0])
          this.stopTime = formatTime(this.rechargeTime[1])
        } else {
          this.startTime = '2000/06/07 00:00:00'
          this.stopTime = formatTime(new Date())
        }
      },
      importFun() {
        this.formatTime()
        this.$store.dispatch('getSign').then((s) => {
          window.open(`${window.urlData.url}/dashbord/transaction/export?oprType=recharge&sign=${s}&startTime=${this.startTime}&stopTime=${this.stopTime}`)
        }).catch(() => {
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .project-manage{
    padding:30px;
  }

</style>
