<template>
  <div class="project-data">
    <el-row :gutter="20">
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
          <el-button >导入</el-button>
        </el-upload>
      </el-col>
      <el-col :span="2">
        <el-button @click="importSignFun">导出</el-button>
      </el-col>
      <el-col :span="4">
        <el-button @click="clickAgree">一键同意</el-button>
      </el-col>
      <el-col :span="8">
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
        <el-input  v-model="searchTxt" placeholder="请输入单号、目标地址">
          <el-button  @click="searchHandler" &pageSize=20 >搜索</el-button>
        </el-input>
      </el-col>

    </el-row>
    <div style="margin-top:30px;">
      <el-table
        :data="recordList.list"
        border
        style="width: 100%">
        <el-table-column
          prop="transactionId"
          label="单号">
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="时间">
        </el-table-column>
        <el-table-column
          prop="value"
          label="提币金额">
        </el-table-column>
        <el-table-column
          prop="toAddress"
          label="目标地址">
        </el-table-column>
        <el-table-column
          label="交易哈希">
          <template slot-scope="scope">
            <a target="_blank" :href="`https://etherscan.io/tx/${scope.row.hash}`">{{scope.row.hash}}</a>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <span v-show="scope.row.transactionStatus !== 1">{{scope.row.transactionStatus | statusFliter}}</span>
            <el-dropdown  @command="handleCommand" v-show="scope.row.transactionStatus === 1">
              <span class="el-dropdown-link">
                待审核<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item :command="{id:scope.row.id, status: 2}">同意</el-dropdown-item>
                <el-dropdown-item :command="{id:scope.row.id, status: 3}">拒绝</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:30px; text-align:center;">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="20"
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
  import { getToken } from '@/utils/auth'
  export default {
    name: 'projectData',
    data() {
      return {
        searchTxt: '',
        rechargeTime: '',
        durationTime: 3,
        pageNum: 1,
        pageSize: 10,
        multipleSelection: [],
        startTime: '',
        stopTime: '',
        action: window.urlData.url + '/dashbord/sign/import',
        uploadHead: {
          Authorization: getToken()
        }
      }
    },
    mounted() {
      this.getTableData(true)
    },
    computed: {
      ...mapGetters({
        recordList: 'recordList'
      })
    },
    methods: {
      handleCommand(c) {
        this.$store.dispatch('getReview', c).then(() => {
          this.getTableData()
        }).catch(() => {
        })
      },
      handleCurrentChange(c) {
        this.pageNum = c
        this.getTableData()
      },
      searchHandler() {
        this.getTableData()
      },
      getTableData(opt) {
        this.formatTime()
        let t = ''
        if (opt) {
          t = '?oprType=withdraw&pageNum=1&pageSize=20&orderBy=created_at desc'
        } else {
          if (this.searchTxt.trim().length >= 40) {
            t = `?oprType=withdraw&pageNum=${this.pageNum}&toAddress=${this.searchTxt}&startTime=${this.startTime}&stopTime=${this.stopTime}&pageSize=20&orderBy=created_at desc`
          } else {
            t = `?oprType=withdraw&pageNum=${this.pageNum}&transactionId=${this.searchTxt}&startTime=${this.startTime}&stopTime=${this.stopTime}&pageSize=20&orderBy=created_at desc`
          }
        }
        this.$store.dispatch('getRecordList', t)
      },
      formatTime() {
        if (Array.isArray(this.rechargeTime)) {
          this.startTime = formatTime(this.rechargeTime[0], false, 'd')
          this.stopTime = formatTime(this.rechargeTime[1], true, 'd')
        } else {
          this.startTime = '2000/06/07 00:00:00'
          this.stopTime = formatTime(new Date(), false, 'd')
        }
      },
      importFun() {
        this.formatTime()
        this.$store.dispatch('getSign').then((s) => {
          window.open(`${window.urlData.url}/dashbord/transaction/export?oprType=withdraw&sign=${s}&startTime=${this.startTime}&stopTime=${this.stopTime}`)
        }).catch(() => {
        })
      },
      importSignFun() {
        this.$store.dispatch('getSign').then((s) => {
          window.open(`${window.urlData.url}/dashbord/sign/export?sign=${s}`)
        }).catch(() => {
        })
      },
      clickAgree() {
        this.$confirm('是否同意所有提币?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('getAgreeAll').then(() => {
            this.getTableData()
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
          })
        }).catch(() => {
        })
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
  .project-data{
    padding:30px;
  }

</style>
