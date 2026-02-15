<script>
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
.uk-section.uk-animation-slide-top-small.uk-padding-remove.bg-blue-fade-out-9
  .uk-container.uk-container-large.uk-padding-remove
    div(class="uk-grid uk-child-width-1-2@s")
      div
        .uk-card.uk-card-body
          h2.uk-h2.uk-margin-remove.fg-orange-700 UVA Darden
          h1.my-text-heavy.uk-heading-medium.uk-margin-remove.fg-blue-500 Global Corporate Patent Dataset
          p.uk-margin-remove <i>Linking 5.3 million USPTO patents to 25 thousand publicly listed companies worldwide</i>
          div
            div(class="uk-column-1-2@m")
              p.fg-orange-900.uk-margin-medium-top.uk-dropcap.uk-text-lead.uk-column-span Corporate innovation plays a crucial role in pushing the frontier of technology — and technology's progress helps advance economic prosperity. By tracking corporate innovation, we can learn much about where and how new ideas, knowledge, products and techniques are emerging.
              p.uk-margin-remove-top The dataset available here provides a window into that world of corporate patents — an important indicator of corporate research and development activities and the consequent innovation over time and across sectors and regions.
              
              p We hope that the public release of this dataset will open up new research possibilities and enable the discovery of insights in different areas of finance and economics. This data will also help advance public discussions, outside of academia, on corporate innovation, productivity and performance.
              nuxt-link(to="/interactive")
                img.uk-box-shadow-small.uk-box-shadow-hover-medium.uk-border-rounded.uk-margin-medium-top.uk-animation-slide-top(aria-hidden="true" src="/img/worldmap.png" alt="World map" @click="loading = !loading")
              p.uk-text-small [Click on the map to interactively explore the dataset. It may take a few seconds to load all data.]
              div(v-if="loading" uk-spinner="ratio:5").uk-position-center.uk-position-absolute
      
      div.uk-margin-large-top
        .uk-card.uk-card-body.uk-margin.bg-orange-50
          h2.uk-h2.fg-blue About the Data
          div
            p The Global Corporate Patent Dataset (v2) links, using sophisticated matching techniques, about <b>5.3 million patents</b> — awarded by the U.S. Patent and Trademark Office (USPTO) between January 1976 and September 2023 — to <b>25 thousand publicly listed companies</b> across 99 countries (as identified by the location of parent companies’ headquarters).

            p.uk-margin-remove Originally released in 2019, the dataset has been significantly updated and expanded in 2026.

            table.uk-table.uk-table-divider.comparison-table.uk-text-small.uk-margin-small-top
              thead
                tr
                  th 
                  th.fg-orange-900 GCPD v1 (2019)
                  th.fg-orange-900 GCPD v2 (2026)
              tbody
                tr
                  td.fg-orange-900 Years covered
                  td 1980 – 2017
                  td 1976 – Sep 2023
                tr
                  td.fg-orange-900 Number of patents
                  td 3.1 Million
                  td 5.3 Million
                tr
                  td.fg-orange-900 Number of companies
                  td 9.2 Thousand
                  td 25 Thousand
                tr
                  td.fg-orange-900 Countries represented
                  td 50
                  td 99

            p Please consult <a href="/documents/DataConstructionDetails_v2.pdf">this document</a> for a detailed description of the dataset, including its key features and how it was constructed. 
            button.uk-button.uk-button-secondary.uk-link-reset: nuxt-link(to="/get-data") Get Data
      
        .uk-card.uk-card-body.uk-tile-muted
          h3.uk-h3.uk-margin-small-top Understanding Innovation Through Patent Data
          p <strong>Pedro Matos</strong>, professor at the University of Virginia Darden School of Business, and <strong>Jan Bena</strong>, professor at the University of British Columbia Sauder School of Business, sat down with the Batten Institute's <strong>Erika Herz</strong> to talk about this dataset.
          p They described important aspects of the data and explained how this resource can benefit scholars who seek to understand corporate innovation.
          audio(controls).uk-margin-remove
            source(src="https://mcdn.podbean.com/mf/play/fn5pmd/CORPORATE_RESEARCH_DEVELOPMENT_OUTCOMES_PT_2.mp3")

</template>

<style lang="scss">
.uk-section {
  min-height: 85vh;
}

audio {
  max-width: 300px;
  object-fit: inherit;
}

.comparison-table th,
.comparison-table td {
  padding: 6px 8px;
}

@media (max-width: 600px) {
  audio {
    max-width: 150px;
    object-fit: inherit;
  }
}
</style>
