<template lang="pug">
footer
  .uk-section.uk-padding-small.bg-blue-fade-out-9.uk-text-center
    p For comments or questions about this dataset, please email us at 
      a(href="mailto:GCPD@darden.virginia.edu")
        span GCPD@darden.virginia.edu
  .uk-section-secondary.uk-padding-small.uk-padding-remove-vertical.bg-blue-400.fg-white
    .uk-container.uk-container-expand
      div(uk-grid).uk-grid.uk-padding-remove
        div(class="uk-width-1-5@m uk-visible@m")
          img#battenlogo(alt="Batten Institute for Entrepreneurship & Innovation" src="https://res.cloudinary.com/asifm/image/upload/c_scale,w_500/v1600971482/UVA_Darden_Batten_stacked.rgb_i27kn0.png").bg-white.uk-padding-small.uk-position-medium
    
        div(class="uk-tile uk-padding uk-width-2-5@m")
          div
            p This website, including the data tools and visualizations in it, has been developed by <span class="uk-text-bold"> the Batten Institute for Entrepreneurship and Innovation </span>at the University of Virginia Darden School of Business. This is part of the long-term support the institute has been providing in various forms to the Global Corporate Patent Dataset project. 
            p The institute's mission is to improve society by creating knowledge about the transformative power of entrepreneurship and innovation and by cultivating principled, entrepreneurial leaders.
            
            div.my-text-thin.uk-text-small
              .uk-icon-button(uk-icon="icon: mail")
              a(href="mailto:Batten@darden.virginia.edu").uk-margin-small-right Batten@darden.virginia.edu
              .uk-icon-button(uk-icon="icon: twitter")
              a(href="https://www.twitter.com/BattenInstitute" target="_blank" rel="noreferrer") @BattenInstitute
              
          .uk-button.uk-button-default.uk-button-small.uk-margin-small-top
            a(href="https://www.darden.virginia.edu/batten-institute/" target="_blank" rel="noreferrer").uk-link-reset More about Batten Institute
            
        div(class="uk-tile uk-padding uk-width-2-5@m")
          div
            p <span class="uk-text-bold">The University of Virginia Darden School of Business</span> delivers the world’s best business education experience to prepare entrepreneurial, global and responsible leaders through its MBA, Ph.D. and Executive Education programs. Darden’s top-ranked faculty is renowned for teaching excellence and advances practical business knowledge through research. 
            p Darden was established in 1955 at the University of Virginia, a top public university founded by Thomas Jefferson in 1819 in Charlottesville, Virginia.
              .uk-button.uk-button-default.uk-button-small
                a(href="http://www.darden.virginia.edu/" target="_blank" rel="noreferrer").uk-link-reset More about Darden School
            
    
  .uk-section.uk-padding-small.uk-text-center.bg-blue-700.fg-white
    p COPYRIGHT © 2019 THE RECTOR AND VISITORS OF THE UNIVERSITY OF VIRGINIA. ALL RIGHTS RESERVED.
</template>

<style lang="scss" scoped>
#battenlogo {
  width: 250px;
}
</style>
