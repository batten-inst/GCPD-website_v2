<template lang="pug">
footer
  .uk-section.uk-padding-small.bg-blue-fade-out-9.uk-text-center.uk-margin-remove
    p For comments or questions about this dataset, please email us at 
      a(href="mailto:GCPD@darden.virginia.edu")
        span GCPD@darden.virginia.edu
  .uk-section-secondary.uk-padding-small.uk-padding-remove-vertical.bg-blue-400.fg-white
    .uk-container.uk-container-expand
      div(uk-grid).uk-grid.uk-padding-remove
        div(class="uk-width-1-5@m uk-visible@m")
          img#battenlogo(alt="Batten Institute for Entrepreneurship, Innovation and Technology" src="https://res.cloudinary.com/asifm/image/upload/c_scale,w_500/v1600971482/UVA_Darden_Batten_stacked.rgb_i27kn0.png").bg-white.uk-padding-small.uk-position-medium
    
        div(class="uk-tile uk-padding uk-width-4-5@m")
          div
            p This website was developed by <span class="uk-text-bold"> #[a(href="https://www.darden.virginia.edu/batten-institute/" target="_blank" rel="noreferrer") the Batten Institute for Entrepreneurship, Innovation and Technology]</span> at #[a(href="http://www.darden.virginia.edu/" target="_blank" rel="noreferrer") the University of Virginia Darden School of Business], as part of its long-term support to the Global Corporate Patent Dataset project. 
            
            div.my-text-thin.uk-text-small
              .uk-icon-button(uk-icon="icon: mail")
              a(href="mailto:Batten@darden.virginia.edu").uk-margin-small-right Batten@darden.virginia.edu
              .uk-icon-button(uk-icon="icon: twitter")
              a(href="https://www.twitter.com/BattenInstitute" target="_blank" rel="noreferrer") @BattenInstitute
        
            
    
  .uk-section.uk-padding-small.uk-text-center.bg-blue-700.fg-white
    p COPYRIGHT © 2026 THE RECTOR AND VISITORS OF THE UNIVERSITY OF VIRGINIA. ALL RIGHTS RESERVED.
</template>

<style lang="scss" scoped>
#battenlogo {
  width: 250px;
}
</style>
