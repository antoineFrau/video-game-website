<template>
  <nav class="navbar has-shadow has-background-white is-fixed-top is-planner">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img style="max-height: 2.75rem;" width="180" height="61" src="../../../assets/images/logo.png"/>
        </a>
      </div>
      <div class="navbar-menu" id="navMenu">
        <div class="navbar-end">
          <div class="navbar-item">
            <p class="buttons">
              <a class="button is-medium tooltip is-tooltip-bottom" data-tooltip="Reset" onclick="document.getElementById('form').reset();">
                <span class="icon is-small">
                  <i class="fas fa-undo-alt"></i>
                </span>
              </a>
              <a class="button is-medium tooltip is-tooltip-bottom" data-tooltip="Close" href="/">
                <span class="icon is-small">
                  <i class="fas fa-times"></i>
                </span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style type="text/css">
  .contact-page .navbar.is-planner a.button {
    font-weight: 400;
    color: #00507F;
    border-color: #ccdce5
  }

  .contact-page .navbar .navbar-brand a.navbar-item {
    background-color: transparent
  }

  .contact-page .navbar .navbar-brand a.navbar-item:hover {
    background-color: transparent
  }

  .contact-page .navbar .navbar-brand a.navbar-item img {
    max-height: 3rem
  }

  .contact-page .navbar .navbar-brand .navbar-burger:hover {
    background-color: transparent
  }

  .contact-page .navbar .navbar-menu .navbar-item {
    font-size: 18px;
    font-weight: 300;
    color: #293347
  }

  .contact-page .navbar .navbar-menu .navbar-item:hover {
    color: #8C43FF;
    background-color: transparent
  }

  .contact-page .navbar .navbar-menu .navbar-item .navbar-link {
    color: #293347
  }

  .contact-page .navbar .navbar-menu .navbar-item .navbar-link:hover {
    color: #8C43FF
  }

  .contact-page .navbar .navbar-menu a.button.is-primary.is-outlined {
    border-width: 2px;
    font-weight: 400;
    font-size: 18px;
    padding: 1.2rem
  }

  .contact-page .navbar .navbar-menu a.button.is-primary.is-outlined span.icon {
    margin-top: 4px;
    width: 25px;
    height: 25px;
    margin-left: 0
  }

  @media screen and (min-width: 1024px) {
    .contact-page .navbar-link::after {
      border: 2px solid #8C43FF;
      border-right: 0;
      border-top: 0;
      content: " ";
      display: block;
      height: 0.5em;
      pointer-events: none;
      position: absolute;
      transform: rotate(-45deg);
      transform-origin: center;
      width: 0.5em;
      margin-top: -0.375em;
      right: 1.4em;
      top: 50%
    }
  }

  @media screen and (max-width: 1087px) {
    .contact-page .navbar > .container {
      display: flex;
      padding: 0 11px
    }
  }

  .contact-page .navbar-end {
    justify-content: flex-end;
    margin-left: auto;
    align-items: stretch;
    display: flex
  }

  .contact-page .navbar, .navbar-menu, .navbar-start {
    align-items: stretch;
    display: flex
  }

  @media screen and (max-width: 1087px) {
    .contact-page .navbar-menu {
      box-shadow: none;
      padding: 0.5rem 0
    }
  }

  .contact-page .navbar-menu {
    flex-grow: 1;
    flex-shrink: 0
  }
</style>