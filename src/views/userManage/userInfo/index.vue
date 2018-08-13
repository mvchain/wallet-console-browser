<template>
  <div class="user-info-con">
    提币数据
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'userInfo',
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'userInfo'
      })
    },
    methods: {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 @import './index';
</style>
