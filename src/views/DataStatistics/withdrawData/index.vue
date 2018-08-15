<template>
  <div class="user-info-con">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-button>汇总导出</el-button>
        <el-button>汇总导入</el-button>
      </el-col>
      <el-col :span="3">
        <el-select v-model="timeIndex" placeholder="请选择">
          <el-option
            v-for="(v, k) in timeChange"
            :key="k"
            @change="timeFun"
            :label="v.name"
            :value="v.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="14">
        <template>
          <el-date-picker
            v-model="rechargeTime"
            v-show="timeIndex === 1"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            value-format="timestamp"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </template>
        <el-date-picker
          v-model="startWeek"
          v-show="timeIndex === 2"
          value-format="timestamp"
          type="week"
          format="yyyy 第 WW 周"
        >
        </el-date-picker>
        <el-date-picker
          v-model="endWeek"
          v-show="timeIndex === 2"
          type="week"
          value-format="timestamp"
          format="yyyy 第 WW 周"
        >
        </el-date-picker>
        <template>
          <el-date-picker
            v-model="startMonth"
            v-show="timeIndex === 3"
            value-format="timestamp"
            type="month"
          >
          </el-date-picker>
          <el-date-picker
            v-model="endMonth"
            v-show="timeIndex === 3"
            value-format="timestamp"
            type="month"
          >
          </el-date-picker>
        </template>

        <el-button >导出表格</el-button>
      </el-col>
      <el-col :span="3" style="text-align: right">中心钱包余额：2000ETH</el-col>
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
    name: 'withdrawData',
    data() {
      return {
        rechargeTime: '',
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
        ],
        timeChange: [
          {
            name: '日数据',
            id: 1
          },
          {
            name: '周数据',
            id: 2
          },
          {
            name: '月数据',
            id: 3
          }
        ],
        timeIndex: 1,
        startWeek: '',
        endWeek: '',
        startMonth: '',
        endMonth: ''
      }
    },
    watch: {
      'timeIndex': function(v, o) {
        console.log(v)
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'userInfo'
      })
    },
    methods: {
      timeFun() {
        console.log(this.timeIndex)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .user-info-con{
    padding:30px;
  }

</style>
