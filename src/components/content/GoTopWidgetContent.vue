<template>
  <p class="buttons goTop" v-bind:class="{ 'is-visible-top-btn': showBackTopButton }">
    <a class="button is-medium has-background-black" v-on:click="scrollToTheTop">
      <span class="icon has-text-white is-small">
        <i class="fa fa-angle-up" aria-hidden="true"></i>
      </span>
    </a>
  </p>
</template>

<script>
  /* eslint-disable */ 
  export default {
    data: () => ({
      showBackTopButton: false
    }),
    created: function () {
      window.addEventListener('scroll', this.handleScroll);
    },
    destroyed: function () {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      scrollToTheTop: function(event){
        this.smoothScroll(window.scrollY)
      },
      smoothScroll: function(h) {
        let i = h;
        if (i > 0) {
          setTimeout(() => {
            window.scrollTo(0, i);
            this.smoothScroll(i - 20);
          }, 5);
        }
        this.showBackTopButton = false
      },
      handleScroll: function () {
        if(window.scrollY == 0 && window.scrollY <= window.innerHeight - window.innerHeight/2){
          this.showBackTopButton = false
        }
        if(!this.showBackTopButton){
          if (window.scrollY >= window.innerHeight - window.innerHeight/1.5) {
            this.showBackTopButton = true
          }  
        }
      }
    }
  }
</script>

<style>
  .goTop {
    position: fixed;
    display: block;
    right: 15px;
    bottom: 15px;
    opacity: 0;
    z-index: -1;
    transition: all .4s ease-out;
  }
  .is-visible-top-btn {
    opacity: .8;
    z-index: 4;
    transition: all .4s ease-in;
  }
</style>
