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
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions">
      </el-date-picker>
        <el-button>表格导出</el-button>
      </el-col>

      <el-col :span="8">
        <el-input v-model="searchTxt" placeholder="请输入单号、目标地址"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button>搜索</el-button>
      </el-col>
    </el-row>
    <div style="margin-top:30px;">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="number"
          label="单号">
        </el-table-column>
        <el-table-column
          prop="time"
          label="时间">
        </el-table-column>
        <el-table-column
          prop="funds"
          label="充值金额">
        </el-table-column>
        <el-table-column
          prop="address"
          label="来源地址">
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
    name: 'projectIndex',
    data() {
      return {
        searchTxt: '',
        rechargeTime: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        tableData: [
          {
            number: 'R123456789',
            time: '2017/11/02/20:00',
            funds: '30ETH',
            address: '0x648662ac074c16f5a807c7c9a979cb2786576cae'
          },
          {
            number: 'R123456789',
            time: '2017/11/02/20:00',
            funds: '30ETH',
            address: '0x648662ac074c16f5a807c7c9a979cb2786576cae'
          },
          {
            number: 'R123456789',
            time: '2017/11/02/20:00',
            funds: '30ETH',
            address: '0x648662ac074c16f5a807c7c9a979cb2786576cae'
          }
        ]
      }
    },
    computed: {
      ...mapGetters({
        projectInfo: 'projectInfo'
      })
    },
    methods: {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './index';
</style>
