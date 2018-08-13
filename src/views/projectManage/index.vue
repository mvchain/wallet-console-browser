<template>
  <div class="project-manage">
    充值记录
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'projectIndex',
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters({
        projectInfo: 'projectInfo'
      })
    },
    methods: {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './index';
</style>
