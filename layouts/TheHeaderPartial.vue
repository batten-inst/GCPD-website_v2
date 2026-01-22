<script>
export default {};
</script>

<template lang="pug">
  nav.uk-navbar-right(uk-navbar uk-sticky="show-on-up:true; animation:uk-animation-slide-top" style="background-color: #fff").uk-box-shadow-small
    nuxt-link(to="/") 
      //- img(alt="Darden School of Business" src="https://res.cloudinary.com/asifm/image/upload/w_400/v1556808653/logo_ho_t3qdlt.png").uk-float-left.uk-margin-left.logo
      img(alt="Darden School of Business" src="~assets/img/logo_ho.png").uk-float-left.uk-margin-left.logo
    .uk-navbar-right.uk-margin-right(class="uk-visible@s")
      ul.uk-navbar-nav
        li.uk-button-text: nuxt-link(to="/") Home
        li.uk-button-text.uk-parent.uk-nav-parent-icon
          nuxt-link(to="/data-highlights/top-companies" id="data-highlights-topmenu") Data Highlights
          .uk-navbar-dropdown
            ul.uk-nav.uk-navbar-dropdown-nav
              li.uk-button-text: nuxt-link(to="/data-highlights/top-companies") Most Innovative Companies
              li.uk-button-text: nuxt-link(to="/data-highlights/rise-of-asia") The Rise of Asia
              li.uk-button-text: nuxt-link(to="/data-highlights/tech-leading-innovation") Tech Industry Leading in Innovation
        li.uk-button-text: nuxt-link(to="/interactive") Interactive
        li.uk-button-text: nuxt-link(to="/publications") Publications
        li.uk-button-text: nuxt-link(to="/get-data") Get Data
        li.uk-button-text: nuxt-link(to="/about-us") About Us
    
    div(class="uk-hidden@s uk-navbar-right uk-margin-right uk-icon-button uk-button-primary")
      span(uk-toggle="target: #mobile-menu" uk-icon="menu")
      

    #mobile-menu(uk-offcanvas class="hidden@s")
      .uk-offcanvas-bar
        ul.uk-nav
          li: nuxt-link(to="/") Home
          li.uk-parent
            nuxt-link(to="/data-highlights/top-companies") Data Highlights
            ul.uk-nav-sub
              li: nuxt-link(to="/data-highlights/top-companies") Most Innovative Companies
              li: nuxt-link(to="/data-highlights/rise-of-asia") The Rise of Asia
              li: nuxt-link(to="/data-highlights/tech-leading-innovation") Tech Industry Leading in Innovation
          li: nuxt-link(to="/interactive") Interactive
          li: nuxt-link(to="/publications") Publications
          li: nuxt-link(to="/get-data") Get Data
          li: nuxt-link(to="/about-us") About Us
</template>

<style lang="scss" scoped>
#data-highlights-topmenu {
  cursor: text;
}

.nuxt-link-exact-active {
  font-weight: bold;
}

.logo {
  display: block;
  width: 225px;
}
</style>
