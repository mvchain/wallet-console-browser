<template>
  <div class="user-info-con">
    <el-row :gutter="20">
      <el-col :span="3">
        <el-select v-model="dateType" @change="changeType"  placeholder="请选择">
          <el-option
            v-for="(v, k) in timeChange"
            :key="k"
            :label="v.name"
            :value="v.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="14">
        <template>
          <el-date-picker
            v-model="rechargeTime"
            v-show="dateType === 0"
            type="daterange"
            align="right"
            :clearable="false"
            :default-time="['00:00:00', '23:59:59']"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </template>
        <el-date-picker
          v-model="rechargeTime[0]"
          v-show="dateType === 1"
          :clearable="false"
          type="week"
          :default-time="['00:00:00', '23:59:59']"
          format="yyyy 第 WW 周"
        >
        </el-date-picker>
        <el-date-picker
          v-model="rechargeTime[1]"
          v-show="dateType === 1"
          :clearable="false"
          type="week"
          :default-time="['00:00:00', '23:59:59']"
          format="yyyy 第 WW 周"
        >
        </el-date-picker>
        <template>
          <el-date-picker
            v-model="rechargeTime[0]"
            v-show="dateType === 2"
            :clearable="false"
            :default-time="['00:00:00', '23:59:59']"
            type="month"
          >
          </el-date-picker>
          <el-date-picker
            v-model="rechargeTime[1]"
            v-show="dateType === 2"
            :clearable="false"
            :default-time="['00:00:00', '23:59:59']"
            type="month"
          >
          </el-date-picker>
        </template>

        <el-button @click="exportTable">导出表格</el-button>
      </el-col>
      <el-col :span="7" style="text-align: right">中心钱包余额：{{assetsData}}ETH</el-col>
    </el-row>
    <div style="margin-top:30px;">
      <el-table
        :data="dataList.list"
        border
        style="width: 100%">

        <el-table-column
          label="日期">
          <template slot-scope="scope">
            <span>{{scope.row.date | getYearWeek(new Date().getFullYear(), dateType === 1)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="value"
          label="提币金额">
        </el-table-column>
        <el-table-column
          prop="orderCount"
          label="订单数">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { formatTime } from '@/utils'
  export default {
    name: 'withdrawData',
    data() {
      return {
        rechargeTime: [],
        rangeWeek: [],
        rangeMonth: [],
        timeChange: [
          {
            name: '日数据',
            id: 0
          },
          {
            name: '周数据',
            id: 1
          },
          {
            name: '月数据',
            id: 2
          }
        ],
        dateType: 0,
        startTime: '',
        stopTime: ''
      }
    },
    watch: {
      'rechargeTime': function(v, o) {
        this.formatTime(this.rechargeTime, 'd')
        this.getTableData(`?startTime=${this.startTime}&stopTime=${this.stopTime}&dateType=${this.dateType}&oprType=withdraw`)
      },
      'rangeWeek': function() {
        this.formatTime(this.rangeWeek, 'w')
        this.getTableData(`?startTime=${this.startTime}&stopTime=${this.stopTime}&dateType=${this.dateType}&oprType=withdraw`)
      },
      'rangeMonth': function() {
        this.formatTime(this.rangeMonth, 'm')
        this.getTableData(`?startTime=${this.startTime}&stopTime=${this.stopTime}&dateType=${this.dateType}&oprType=withdraw`)
      }
    },
    computed: {
      ...mapGetters({
        dataList: 'dataList',
        assetsData: 'assetsData'
      })
    },
    mounted() {
      this.formatTime(this.rechargeTime, 'd')
      this.getTableData(`?startTime=${this.startTime}&stopTime=${this.stopTime}&dateType=${this.dateType}&oprType=withdraw`)
      this.$store.dispatch('getAssets', '?type=eth')
    },
    methods: {
      changeType(t) {
        this.getTableData(`?startTime=${this.startTime}&stopTime=${this.stopTime}&dateType=${t}&oprType=recharge`)
      },
      formatTime(t, d) {
        t[0] ? this.startTime = formatTime(t[0], false, d) : this.startTime = '2000/06/07 00:00:00'
        t[1] ? this.stopTime = formatTime(t[1], true, d) : this.stopTime = formatTime(new Date(), false, 'd')
      },
      getTableData(t) {
        this.$store.dispatch('getRWData', t).then(() => {
        }).catch(() => {
        })
      },
      exportTable() {
        this.$store.dispatch('getSign').then((s) => {
          window.open(`${window.urlData.url}/dashbord/transaction/count/export?startTime=${this.startTime}&stopTime=${this.stopTime}&dateType=${this.dateType}&oprType=withdraw&sign=${s}`)
        }).catch(() => {
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .user-info-con{
    padding:30px;
  }

</style>
