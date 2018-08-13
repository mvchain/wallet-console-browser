<template>
  <div class="user-list">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-button>汇总导出</el-button>
        <el-button>汇总导入</el-button>
      </el-col>
      <el-col :span="8">
        <el-date-picker
          v-model="rechargeTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
        <el-button>表格导出</el-button>
      </el-col>

    </el-row>
    <div style="margin-top:30px;">
      <el-table
        :data="tableData"
        style="width: 100%">

        <el-table-column
          prop="time"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="funds"
          label="充值金额">
        </el-table-column>
        <el-table-column
          prop="count"
          label="订单数">
        </el-table-column>
      </el-table>
      <div style="margin-top:30px; text-align:center;">
        <el-pagination
          layout="prev, pager, next"
          :total="50">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'basicInfo',
    data() {
      return {
        rechargeTime: '',
        pickerOptions: {
          shortcuts: [{
            text: '日数据',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '周数据',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '月数据',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        tableData: [
          {
            time: '2017/11/02/20:00',
            funds: '30ETH',
            count: '1'
          },
          {
            time: '2017/11/02/20:00',
            funds: '30ETH',
            count: '2'
          },
          {
            time: '2017/11/02/20:00',
            funds: '30ETH',
            count: '3'
          }
        ]
      }
    },
    computed: {
      ...mapGetters({
        addressCount: 'addressCount'
      })
    },
    methods: {
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import './index';
</style>
