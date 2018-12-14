<template>
  <footer class="section is-primary is-small has-text-centered">
    <div class="columns is-centered"> 
      <div class="column is-one-third">
        <h1 class="title has-text-white is-size-4-touch">Footer TP5.</h1>
      </div>
    </div>
    <div class="copyright">Handcrafted by Antoine Frau<span class="icon has-white-text" style="vertical-align:middle;"><i class="far fa-copyright"></i></span>{{ new Date().getFullYear() }}
    </div>
  </footer>
</template>

<script>

</script>

<style type="text/css">
  footer .social-icons {
      margin: 0 auto 3rem
  }

  @media screen and (min-width: 769px) {
      footer .social-icons {
          margin: 0 auto 3.5rem
      }
  }

  footer .social-icons a.button {
      background-color: #fff;
      border-radius: 100%;
      margin: 0 .2rem;
      height: 47px;
      width: 47px;
  }

  @media screen and (min-width: 769px) {
      footer .social-icons a.button {
          margin: 0 0.8rem
      }
  }

  footer .social-icons a.button.is-medium {
      font-size: 1.05rem
  }

  @media screen and (min-width: 769px) {
      footer .social-icons a.button.is-medium {
          font-size: 1.18rem
      }
  }

  footer .social-icons a.button .icon.is-small {
      height: 1.4em;
      width: 1.4em
  }

  footer .social-icons a.button:hover {
      background: #fff;
      color: #00507F;
      border: 2px solid #fff
  }
</style>
