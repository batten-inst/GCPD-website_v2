<script>
export default {
  data() {
    return {
      members: [
        {
          name: 'Jan Bena',
          title:'Associate Professor, Bank of Montreal Chair in International Finance, University of British Columbia Sauder School of Business <br>Batten Research Fellow, UVA Darden School of Business',
          personalWebsite: 'https://www.janbena.com/',
        },
        {
          name: 'Miguel A. Ferreira',
          title: 'BPI Fundação la Caixa Chair in Responsible Finance, Nova School of Business and Economics',
          personalWebsite: 'https://www.miguelferreirafinance.com/',
        },
        {
          name: 'Pedro Matos',
          title: 'James A. and Stacy Cooper Bicentennial Professor of Business Administration, UVA Darden School of Business',
          personalWebsite: 'https://www.darden.virginia.edu/faculty-research/directory/pedro-matos',
        },
        {
          name: 'Pedro Pires',
          title: 'Assistant Professor of Economics, Nova School of Business and Economics',
          personalWebsite: 'https://www.pedropires.io/',
        },
        {
          name: 'David Barkemayer',
          title: 'Research Fellow, University of British Columbia Sauder School of Business',
          personalWebsite: 'https://www.linkedin.com/in/david-barkemeyer/',
        }
      ],
    };
  },
};
</script>

<template lang="pug">
.uk-section.uk-animation-slide-top-small
  .uk-container.uk-container-exapnd
    main(uk-grid class="uk-grid uk-child-width-1-2@m")
      div
        div.bg-blue-50.uk-card-body
          h2.uk-heading-small.fg-blue The Project Team
          p <span class="uk-text-bold">The UVA Darden Global Corporate Patent Dataset</span> is the result of a multiyear collaboration among the following academic scholars. 
          dl(v-for="(member, i) in members" :key="i").uk-width-1-1.uk-description-list
            dt.my-text-heavy <a :href="member.personalWebsite" target="_blank">{{ member.name }}</a>
            dd(v-html="member.title")
            
      div 
        div.bg-orange-50.uk-card-body
          h2.fg-orange-900 Batten Institute for Entrepreneurship, Innovation and Technology
          p The Batten Institute, at the UVA Darden School of Business, provided institutional support to this collaboration. The Institute's research initiative advances knowledge that addresses real-world challenges and shapes Darden's curriculum, and its educational offerings are ranked among the best in the world. The Batten Institute was established by the vision and philanthropy of UVA alumnus Frank Batten Sr. <a href="http://www.darden.virginia.edu/batten-institute/" target="_blank">Learn more</a>
        
          div
            img(alt="Darden School of Business" src="/img/darden-saunders.jpg")
            .uk-margin-remove.uk-text-meta.uk-lightbox-caption Darden School of Business at the University of Virginia
        
</template>
