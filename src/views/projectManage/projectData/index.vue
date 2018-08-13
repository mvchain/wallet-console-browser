<template>
  <div class="project-data">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-button>导入</el-button>
        <el-button>导出</el-button>
        <el-button>一键同意</el-button>
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

      <el-col :span="6">
        <el-input v-model="searchTxt" placeholder="请输入单号、目标地址"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button>搜索</el-button>
      </el-col>
    </el-row>
    <div style="margin-top:30px;">
      <el-table
        :data="tableData"
        @selection-change="handleSelectionChange"
        border
        style="width: 100%">
        <el-table-column
          type="selection"
          :selectable="isSelected"
          width="55">
        </el-table-column>
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
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-dropdown  @command="handleCommand">
      <span class="el-dropdown-link">
        待审核<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">同意</el-dropdown-item>
                <el-dropdown-item command="0">拒绝</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
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
    name: 'projectData',
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
        ],
        multipleSelection: []
      }
    },
    mounted() {
    },
    computed: {
      ...mapGetters({
        salesList: 'salesList'
      })
    },
    methods: {
      handleCommand(c) {
        console.log(c)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
        console.log(val)
      },
      isSelected(r, index) {
        if (index) {
          return true
        }
        return false
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './index';
</style>
