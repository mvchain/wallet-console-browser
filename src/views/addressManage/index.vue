<template>
  <div class="address-manage">
    <el-row :gutter="20">
      <el-col :span="3">
        <el-upload
          class="upload-demo"
          :action="action"
          :headers="uploadHead"
          :on-success="successFun"
          :on-error="errorFun"
          multiple
          :limit="3"
          :file-list="fileList">
          <el-button size="small" type="primary">地址导入</el-button>
        </el-upload>
      </el-col>
      <el-col :span="3">
        <el-button style="color:#5a5e66;cursor:default;" type="text">待分配地址数量：{{addressCount.surplus}}</el-button>
      </el-col>
      <el-col :span="10">
        <el-button style="color:#5a5e66;cursor:default;" type="text">已分配地址数量：{{addressCount.use}}</el-button>
        <el-select style="float:right; margin-left:20px;" v-model="isUsed" placeholder="请选择">
          <el-option
            v-for="(v, k) in options"
            :key="k"
            :label="v.name"
            :value="v.id">
          </el-option>
        </el-select>
        <el-button @click="exportTable" style="float:right;">导出数据</el-button>
      </el-col>
      <el-col :span="8">
        <el-input v-model="searchTxt" placeholder="请输入地址">
          <el-button @click="searchHandler" slot="append">搜索</el-button>
        </el-input>
      </el-col>
    </el-row>
    <div style="margin-top:30px;">
      <el-table
        :data="addressTable.list"
        border
        style="width: 100%">
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.isUsed | isUsedFilter}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:30px; text-align:center;">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="10"
          layout="prev, pager, next"
          :total="addressTable.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getToken } from '@/utils/auth'
  export default {
    name: 'address',
    data() {
      return {
        searchTxt: '',
        durationTime: 3,
        isUsed: '',
        options: [
          {
            name: '所有',
            id: ''
          },
          {
            name: '已分配',
            id: '1'
          },
          {
            name: '未分配',
            id: '0'
          }
        ],
        uploadHead: {
          Authorization: getToken()
        },
        pageNum: '1',
        fileList: [],
        pageSize: 20,
        action: window.urlData.url + '/dashbord/account/import'
      }
    },
    computed: {
      ...mapGetters([
        'addressCount',
        'addressTable'
      ])
    },
    mounted() {
      this.$store.dispatch('getAddrCount')
      this.getTableData(`?pageNum=${this.pageNum}&pageSize=${this.pageSize}`)
    },
    methods: {
      exportTable() {
        this.$store.dispatch('getSign').then((s) => {
          window.open(`${window.urlData.url}/dashbord/account/export?address=${this.searchTxt}&sign=${s}&isUsed=${this.isUsed}`)
        }).catch(() => {
        })
      },
      getTableData(txt) {
        this.$store.dispatch('getAddrTable', txt)
      },
      handleCurrentChange(t) {
        this.pageNum = t
        this.getTableData(`?pageNum=${t}&pageSize=${this.pageSize}&address=${this.searchTxt}&isUsed=${this.isUsed}`)
      },
      searchHandler() {
        this.getTableData(`?pageNum=${this.pageNum}&pageSize=${this.pageSize}&address=${this.searchTxt}&isUsed=${this.isUsed}`)
      },
      successFun(s) {
        if (s.code !== 200) {
          this.$message.error(`上传失败${s.message}`)
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
        this.$message.error('上传失败')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .address-manage{
    padding:30px;
  }

</style>
