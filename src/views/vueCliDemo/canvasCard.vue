<template>
  <div class="tipsBox">
  <initCardDialog :data="data"/>

  </div>
</template>

<script>
import initCardDialog from '@/components/initCardDialog'
export default {
  name: 'home',
  components: { initCardDialog },
  data () {
    return {
      data: {}
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
</style>
