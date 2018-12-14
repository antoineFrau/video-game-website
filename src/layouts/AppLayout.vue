<!-- Layout = Full page   -->
<template>
    <section class="hero is-fullheight is-default is-bold">
      <div class="hero-head">
        <navbar></navbar>
      </div>
      
      <router-view></router-view>
      
      <div class="hero-foot">
        <div class="footer has-text-white" style="background-color: rgba(0,80,127,.8);">
            <my-footer></my-footer>
        </div>
      </div>
    </section>
</template>

<script>
  /* eslint-disable */ 
  import MainMenu from '@/components/nav/Menus/MainMenu'
  import MainFooter from '@/components/nav/Footers/MainFooter'

  export default {
    components: {
      'navbar': MainMenu,
      'my-footer': MainFooter
    }
  }
</script>