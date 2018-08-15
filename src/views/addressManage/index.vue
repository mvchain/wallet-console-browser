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
      <el-col :span="3">
        <el-button style="color:#5a5e66;cursor:default;" type="text">已分配地址数量：{{addressCount.use}}</el-button>
      </el-col>
      <el-col :span="6">
        <el-input v-model="searchTxt" placeholder="请输入地址"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button @click="searchHandler">搜索</el-button>
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
        uploadHead: {
          Authorization: getToken()
        },
        pageNum: '1',
        fileList: [],
        pageSize: 10,
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
      getTableData(txt) {
        this.$store.dispatch('getAddrTable', txt)
      },
      handleCurrentChange(t) {
        this.pageNum = t
        this.getTableData(`?pageNum=${t}&pageSize=${this.pageSize}&address=${this.searchTxt}`)
      },
      searchHandler() {
        this.getTableData(`?pageNum=${this.pageNum}&pageSize=${this.pageSize}&address=${this.searchTxt}`)
      },
      successFun(s) {
        if (s.code !== 200) {
          this.$message.error(`上传失败${s.message}`)
        } else {
          this.$message.success('上传成功')
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
