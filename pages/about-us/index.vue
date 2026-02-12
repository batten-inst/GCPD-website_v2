<script>
export default {
  data() {
    return {
      members: [
        {
          name: 'Jan Bena',
          title:'Associate Professor, Bank of Montreal Chair in International Finance, University of British Columbia Sauder School of Business <br>Batten Research Fellow, UVA Darden School of Business',
          email: 'Jan.bena@sauder.ubc.ca',
        },
        {
          name: 'Miguel A. Ferreira',
          title: 'BPI Fundação la Caixa Chair in Responsible Finance, Nova School of Business and Economics',
          email: 'miguel.ferreira@novasbe.pt',
        },
        {
          name: 'Pedro Matos',
          title: 'James A. and Stacy Cooper Bicentennial Professor of Business Administration, UVA Darden School of Business',
          email: 'matosp@darden.virginia.edu',
        },
        {
          name: 'Pedro Pires',
          title: 'Research Fellow, Nova School of Business and Economics',
          email: 'pedro.pires@novasbe.pt',
        },
      ],
    };
  },
};
</script>

<template lang="pug">
.uk-section.uk-animation-slide-top-small
  .uk-container.uk-container-exapnd
    main(uk-grid class="uk-grid uk-child-width-1-2@s")
      div
        .uk-card.uk-card-default.uk-card-body
          h1.uk-heading-small.fg-blue The Project Team
          p <span class="uk-text-bold">The UVA Darden Global Corporate Patent Dataset</span> is the result of a multiyear collaboration among the following academic scholars. 
          p If you have any questions, suggestions or comments, please contact us at <a href="mailto:GCPD@darden.virginia.edu">GCPD@darden.virginia.edu</a>.
          dl(v-for="(member, i) in members" :key="i").uk-width-1-1.uk-description-list
            dt.my-text-heavy {{ member.name }}
            dd(v-html="member.title")
            
      
      div 
        .uk-card.uk-card-body.uk-card-default#batten
          h1.fg-orange-900 Batten Institute for Entrepreneurship, Innovation and Technology
          p The Batten Institute for Entrepreneurship, Innovation and Technology at the UVA Darden School of Business provided institutional support to this collaboration. The Institute's research initiative advances knowledge that addresses real-world challenges and shapes Darden's curriculum, and its educational offerings are ranked top 10 in the world. The Batten Institute was established by the vision and philanthropy of UVA alumnus Frank Batten Sr. 
          
          a.uk-button.uk-link-reset.uk-button-default(href="http://www.darden.virginia.edu/batten-institute/" target="_blank") Learn more
        
          div.uk-margin-medium-top.uk-align-right
            img(alt="Darden School of Business" src="/img/darden-saunders.jpg")
            .uk-text-center.uk-margin-remove.uk-text-small.uk-lightbox-caption Darden School of Business at the University of Virginia
        
</template>
