<template>
  <div>
    <router-view></router-view>
    <go-top></go-top>
  </div>
</template>
<script>
  import GoTop from '@/components/content/GoTopWidgetContent'

  export default {
    components: {
      'go-top': GoTop
    }
  }
</script>