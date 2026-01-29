<script>
// import MethodSummary from '@/content/MethodSummary.md';
export default {
  data() {
    return {
      loading: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loading = false;
    });
  },
};
</script>

<template lang="pug">
.uk-section.uk-animation-slide-top-small.uk-padding-small.uk-margin-small-bottom#main-section
  .uk-container.uk-container-large.uk-padding-remove-top
    div(class="uk-grid uk-child-width-1-2@s")
      div
        .uk-card.uk-card-body
          h2.uk-h2.uk-margin-remove.fg-orange-700 UVA Darden
          h1.my-text-heavy.uk-heading-medium.uk-margin-remove.fg-blue-500 Global Corporate Patent Dataset
          div
            div(class="uk-column-1-2@m")
              p.fg-blue-fade-out-2.uk-dropcap.uk-text-large.uk-column-span Corporate innovation plays a crucial role in pushing the frontier of technology — and technology's progress helps advance economic prosperity. By tracking corporate innovation, we can learn much about where and how new ideas, knowledge, products and techniques are emerging.
              p.uk-margin-remove-top The new dataset available here provides a window into the world of corporate patents — an important indicator of corporate research and development activities and the consequent innovation—across sectors and countries.
              p The public release of this dataset will hopefully open up new research possibilities and enable the discovery of insights in different areas of finance and economics. This data will also help advance public discussions, outside of academia, on corporate innovation, productivity and performance.
              nuxt-link(to="/interactive")
                img.uk-box-shadow-small.uk-border-rounded.uk-margin-medium-top.uk-animation-slide-top(aria-hidden="true" src="https://res.cloudinary.com/asifm/image/upload/w_300/v1543798822/worldmap_static_j4peu3.png" alt="World map" @click="loading = !loading")
              p.uk-text-small [Click on the map to see a larger, interactive version. It may take a few seconds to load all data.]
              div(v-if="loading" uk-spinner="ratio:5").uk-position-center.uk-position-absolute
      
      div.uk-margin-large-top
        .uk-card.uk-card-body.uk-margin.bg-orange-50
          h2.uk-h2.fg-blue About the Data
          div(class="uk-column-1-2@l")
            p The Global Corporate Patent Dataset links 3.1 million patents awarded by the U.S. Patent and Trademark Office (USPTO), between 1980 and 2017, to 9.2 thousand publicly listed firms worldwide. By the location of parent companies’ headquarters, the firms patenting at the USPTO come from 50 different countries around the world.
            p A detailed description of the dataset, including its key features and how it was constructed, can be found in <a href="/documents/DataConstructionDetails_v01.pdf"> this document</a>. 
            p Please visit the other sections of this website to explore the breadth of the dataset's coverage — across countries and sectors over time. 
            button.uk-button.uk-button-primary.uk-link-reset: nuxt-link(to="/get-data") Get Data
      
        .uk-card.uk-card-body.uk-tile-muted
          h3.uk-h3 Understanding Innovation Through Patent Data
          p <strong>Pedro Matos</strong>, professor at the University of Virginia Darden School of Business, and <strong>Jan Bena</strong>, professor at the University of British Columbia Sauder School of Business, sat down with the Batten Institute's <strong>Erika Herz</strong> to talk about this dataset.
          p They described important aspects of the data and explained how this resource can benefit scholars who seek to understand corporate innovation.
          audio(controls).uk-margin-remove
            source(src="https://mcdn.podbean.com/mf/play/fn5pmd/CORPORATE_RESEARCH_DEVELOPMENT_OUTCOMES_PT_2.mp3")

</template>

<style lang="scss" scoped>
#main-section {
  min-height: 80vh;
  background-color: #e9f0fc;
}
audio {
  max-width: 300px;
  object-fit: inherit;
}
@media (max-width: 600px) {
  audio {
    max-width: 150px;
    object-fit: inherit;
  }
  .uk-padding-small {
    padding: 0%;
  }
  .uk-container {
    padding: 0%;
  }
  .uk-margin-large-top {
    margin: 0%;
  }
}
</style>
