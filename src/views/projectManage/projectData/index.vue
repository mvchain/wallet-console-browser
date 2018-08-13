<template>
  <div class="project-data">
    提币记录
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'projectData',
    data() {
      return {
      }
    },
    mounted() {
    },
    computed: {
      ...mapGetters({
        salesList: 'salesList'
      })
    },
    methods: {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './index';
</style>
