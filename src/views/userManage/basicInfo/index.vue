<template>
  <div class="user-list">
    充值数据
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'basicInfo',
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters({
        addressCount: 'addressCount'
      })
    },
    methods: {
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import './index';
</style>
