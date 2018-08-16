<template>
  <div class="user-list">
    <el-row :gutter="20">
      <el-col :span="2">
        <el-button @click="summaryExport">汇总导出</el-button>
      </el-col>
      <el-col :span="2">
        <el-upload
          class="upload-demo"
          :action="action"
          :headers="uploadHead"
          :on-success="successFun"
          :on-error="errorFun"
          :show-file-list="false"
          multiple
          :limit="3"
        >
          <el-button >汇总导入</el-button>
        </el-upload>
      </el-col>
      <el-col :span="3">
        <el-select v-model="dateType" placeholder="请选择">
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
      <el-col :span="3" style="text-align: right">中心钱包余额：2000ETH</el-col>
    </el-row>
    <div style="margin-top:30px;">
      <el-table
        :data="dataList.list"
        border
        style="width: 100%">

        <el-table-column
          prop="date"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="value"
          label="充值金额">
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
  import { getToken } from '@/utils/auth'
  export default {
    name: 'rechargeData',
    data() {
      return {
        action: window.urlData.url + '/dashbord/collect/import',
        rechargeTime: [],
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
        stopTime: '',
        uploadHead: {
          Authorization: getToken()
        }
      }
    },
    watch: {
      'dateType': function(v, o) {
        console.log(v)
      },
      'rechargeTime': function(v, o) {
        this.formatTime()
        this.getTableData(`?startTime=${this.startTime}&stopTime=${this.stopTime}&dateType=${this.dateType}&oprType=recharge`)
      }
    },
    computed: {
      ...mapGetters({
        dataList: 'dataList',
        assetsData: 'assetsData'
      })
    },
    mounted() {
      this.formatTime()
      this.getTableData(`?startTime=${this.startTime}&stopTime=${this.stopTime}&dateType=${this.dateType}&oprType=recharge`)
      this.$store.dispatch('getAssets', '?type=eth')
    },
    methods: {
      formatTime() {
        if (Array.isArray(this.rechargeTime) && this.rechargeTime.length !== 0) {
          this.startTime = formatTime(this.rechargeTime[0])
          this.stopTime = formatTime(this.rechargeTime[1])
        } else {
          this.startTime = '2000/06/07 00:00:00'
          this.stopTime = formatTime(new Date())
        }
      },
      getTableData(t) {
        this.$store.dispatch('getRWData', t).then(() => {
        }).catch(() => {
        })
      },
      exportTable() {
        this.formatTime()
        switch (this.dateType) {
          case 0:
            this.$store.dispatch('getSign').then((s) => {
              window.open(`${window.urlData.url}/dashbord/transaction/count/export?startTime=${this.startTime}&stopTime=${this.stopTime}&dateType=${this.dateType}&oprType=recharge`)
            }).catch(() => {
            })
            break
          case 1:
            console.log(this.rechargeTime)
            break
          case 2:
            console.log(this.rechargeTime)
            break
          default:
            break
        }
      },
      summaryExport() {
        this.$store.dispatch('getSign').then((s) => {
          window.open(`${window.urlData.url}/dashbord/collect/count/expport?sign=${s}`)
        }).catch(() => {})
      },
      successFun(s) {
        if (s.code !== 200) {
          this.$message.error(`导入失败${s.message}`)
        } else {
          this.$message.success('导入成功')
        }
      },
      errorFun() {
        this.$message.error('导入失败')
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .user-list{
    padding:30px;
  }

</style>
