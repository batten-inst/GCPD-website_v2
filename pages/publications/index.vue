<script>
import { publicationsDataProm } from '@/assets/js/fetchData';

export default {
  data() {
    return {
      publications: [],
    };
  },
  async mounted() {
    const data = await publicationsDataProm;
    const imgMap = {
      'Journal of Financial Economics': '/img/jfe-cover.gif',
      'Journal of Political Economy': '/img/jpe-cover.png',
      'Journal of Accounting Research': '/img/joar-cover.webp',
      'Strategic Management Journal': '/img/smj-cover.jpg',
      'UVA Darden Research Briefing': '/img/darden-briefing-cover.png',
    };


    this.publications = data.map(pub => ({
      ...pub,
      imgSrc: imgMap[pub.publication] || '',
    }));
  },
};
</script>

<template lang="pug">
.uk-section.uk-animation-slide-top-small
  .uk-container(class="uk-width-1-2@xl uk-width-3-4@l")
    h1.uk-heading-small GCPD in Research Publications
    div
      p GCPD was first used in the following 2017 research paper, published in a leading finance journal. You can also read the 2018 UVA Darden Research Briefing, written for a general audience based on that paper.
      div.uk-grid(class="uk-child-width-1-2@m").uk-padding-remove
        div(v-for="(pub, i) in publications" :key="i" v-if="pub.highlight == '1'")
          div.uk-card-body.bg-orange-50
            img.uk-width-small(:src="pub.imgSrc" :alt="pub.publication")
            .uk-h6.uk-margin-remove
              span.fg-blue {{ pub.publication }} 
              span.fg-orange-700 {{ pub.year }}
            p.uk-text-large.uk-margin-small {{ pub.title }}
            p.uk-text-bold.uk-margin-remove {{ pub.authors }}

            p.uk-text-small.fg-blue Abstract: “{{ pub.abstract }}”
            button.uk-button.uk-button-primary(v-if="pub.downloadLink")
              a(:href="pub.downloadLink" download).uk-link-reset Download

            button.uk-button.uk-button-secondary(v-if="pub.readMoreLink")
              a(:href="pub.readMoreLink" ).uk-link-reset Read More
    div.uk-divider-icon
    div
      p The dataset has since been used in top publications in other fields — as seen in the following sample list of papers in economics (JPE), accounting (JAR) and strategy (SMJ).
      p Click on a cover image to read more about that paper.
      div(class="uk-width-2-3@s" v-for="(pub, i) in publications" :key="i" v-if="pub.highlight == 0").uk-card-default
        div.uk-card-body.uk-margin-bottom.bg-blue-fade-out-9
          a(:href="pub.readMoreLink" target="_blank").uk-link-reset
            img.uk-width-small(:src="pub.imgSrc" :alt="pub.publication")
          .uk-h6.uk-margin-remove
            span.fg-blue {{ pub.publication }} 
            span.fg-orange-700 {{ pub.year }}
          p.uk-text-large.uk-margin-small {{ pub.title }}
          p.uk-text-bold.uk-margin-remove {{ pub.authors }}
          p.uk-text-small.fg-blue Abstract: “{{ pub.abstract }}”


</template>
