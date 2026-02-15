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
    p.uk-text-lead Since GCPD's first use in a 2017 paper in a leading finance journal (JFE), it has been used in other top publications — as seen in this sample list of papers in economics (JPE), accounting (JAR) and strategy (SMJ).
    p Read <a href="/documents/UVA-Darden-Research-Briefing.pdf" target="_blank">a UVA Darden Research Briefing</a> based on the original paper. 
    .uk-grid.uk-grid(uk-grid).uk-grid-large(class="uk-child-width-1-2@s")
      div(v-for="(pub, i) in publications" :key="i")
        div(:class="i === 0 ? 'bg-blue-50' : 'bg-orange-50'")
          .uk-card-body
            .uk-h6
              span.fg-blue {{ pub.publication }} 
              span.fg-orange-700 {{ pub.year }}
            img.uk-width-small(:src="pub.imgSrc" :alt="pub.publication").uk-float-right
            p.uk-text-large {{ pub.title }}
            p.uk-text-bold.uk-margin-remove {{ pub.authors }}

            p.uk-text-small.fg-blue Abstract: “{{ pub.abstract }}”
            button.uk-button.uk-button-primary(v-if="pub.downloadLink")
              a(:href="pub.downloadLink" download).uk-link-reset Download

            button.uk-button.uk-button-secondary(v-if="pub.readMoreLink")
              a(:href="pub.readMoreLink" ).uk-link-reset Read More
</template>
