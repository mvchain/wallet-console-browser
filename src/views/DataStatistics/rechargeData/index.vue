<template>
  <div class="user-list">
    <el-row :gutter="20">
      <el-col :span="2">
        <el-button @click="summaryExport">汇总导出</el-button>
      </el-col>
      <el-col :span="5">
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
        <el-select v-model="dateType" @change="changeType" placeholder="请选择">
          <el-option
            v-for="(v, k) in timeChange"
            :key="k"
            :label="v.name"
            :value="v.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="10">
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
            v-model="rangeWeek[0]"
            v-show="dateType === 1"
            :clearable="false"
            type="week"
            :default-time="['00:00:00', '23:59:59']"
            format="yyyy 第 WW 周"
          >
          </el-date-picker>
          <el-date-picker
            v-model="rangeWeek[1]"
            v-show="dateType === 1"
            :clearable="false"
            type="week"
            :default-time="['00:00:00', '23:59:59']"
            format="yyyy 第 WW 周"
          >
          </el-date-picker>
        <template>
          <el-date-picker
            v-model="rangeMonth[0]"
            v-show="dateType === 2"
            :clearable="false"
            :default-time="['00:00:00', '23:59:59']"
            type="month"
          >
          </el-date-picker>
          <el-date-picker
            v-model="rangeMonth[1]"
            v-show="dateType === 2"
            :clearable="false"
            :default-time="['00:00:00', '23:59:59']"
            type="month"
          >
          </el-date-picker>
        </template>

        <el-button @click="exportTable">导出表格</el-button>
        <el-button @click="withdrawFlag = true">提现</el-button>
      </el-col>
      <el-col :span="3" style="text-align: right">中心钱包余额：{{assetsData}}ETH</el-col>
    </el-row>
    <div style="margin-top:30px;">
      <el-table
        :data="dataList.list"
        border
        @row-click="rowClick"
        style="width: 100%">

        <el-table-column
          label="日期">
          <template slot-scope="scope">
            <span>{{scope.row.date | getYearWeek(new Date().getFullYear(), dateType === 1)}}</span>
          </template>
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
    <el-dialog title="提现" :visible.sync="withdrawFlag" width="600px">
      <el-form :model="withdrawForm" ref="withdrawForm" :rules="withdrawRules" >
        <el-form-item label="目标地址" label-width="100px">
          <el-input v-model="withdrawForm.address" ></el-input>
        </el-form-item>
        <el-form-item label="金额" label-width="100px">
          <el-input v-model="withdrawForm.value" ></el-input>
        </el-form-item>

        <el-form-item  class="dialog-footer">
          <el-button @click="withdrawFlag = false">取 消</el-button>
          <el-button type="primary" @click="withdrawFun('withdrawForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
        rangeWeek: [],
        rangeMonth: [],
        durationTime: 3,
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
        },
        withdrawFlag: false,
        withdrawForm: {
          address: '',
          value: ''
        },
        withdrawRules: {
          address: [
            { required: true, message: '请输入提现地址', trigger: 'blur' }
          ],
          value: [
            { required: true, message: '请输入金额', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {
      'rechargeTime': function(v, o) {
        this.formatTime(this.rechargeTime, 'd')
        this.getTableData(`?startTime=${this.startTime}&stopTime=${this.stopTime}&dateType=${this.dateType}&oprType=recharge`)
      },
      'rangeWeek': function() {
        this.formatTime(this.rangeWeek, 'w')
        this.getTableData(`?startTime=${this.startTime}&stopTime=${this.stopTime}&dateType=${this.dateType}&oprType=recharge`)
      },
      'rangeMonth': function() {
        this.formatTime(this.rangeMonth, 'm')
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
      this.formatTime(this.rechargeTime, 'd')
      this.getTableData(`?startTime=${this.startTime}&stopTime=${this.stopTime}&dateType=${this.dateType}&oprType=recharge`)
      this.$store.dispatch('getAssets', '?type=eth')
    },
    methods: {
      rowClick(r) {
        let startTime = ''
        let stopTime = ''
        if (r.dateStr.includes('至')) {
          startTime = r.dateStr.split('至')[0].replace(/-/ig, '/') + ' 0:0:0'
          stopTime = r.dateStr.split('至')[1].replace(/-/ig, '/') + ' 23:59:59'
          console.log(startTime, stopTime)
        } else {
          if (r.dateStr.length > 7) {
            startTime = r.dateStr.replace(/-/ig, '/') + ' 0:0:0'
            stopTime = r.dateStr.replace(/-/ig, '/') + ' 23:59:59'
            console.log(startTime, stopTime)
          } else {
            const mm = new Date(r.date).getMonth() + 1
            const yy = new Date(r.date).getFullYear()
            const temp = new Date(yy, mm, 0)
            startTime = formatTime(new Date(r.date)).split(' ')[0] + ' 0:0:0'
            stopTime = formatTime(temp).replace(/0:0:0/ig, '') + '23:59:59'
            console.log(startTime, stopTime)
          }
        }
        this.$router.push({ path: '/projectManage/projectIndex', query: { startTime, stopTime }})
      },
      withdrawFun(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('postWithdraw', this.withdrawForm).then(() => { this.$message.success('提交成功') }).catch()
            this.withdrawFlag = false
          } else {
            this.$message.error('请输入正确信息')
            return false
          }
        })
      },
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
          window.open(`${window.urlData.url}/dashbord/transaction/count/export?startTime=${this.startTime}&stopTime=${this.stopTime}&dateType=${this.dateType}&oprType=recharge&sign=${s}`)
        }).catch(() => {
        })
      },
      summaryExport() {
        this.$store.dispatch('getSign').then((s) => {
          window.open(`${window.urlData.url}/dashbord/collect/export?sign=${s}`)
        }).catch(() => {})
      },
      successFun(s) {
        if (s.code !== 200) {
          this.$message.error(`导入失败${s.message}`)
        } else {
          window.setInterval(() => {
            this.durationTime--
            if (this.durationTime === -1) {
              this.$router.go(0)
            }
          }, 1000)
          this.$message.success({
            message: '上传成功,3秒后刷新页面',
            duration: 3000
          })
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
