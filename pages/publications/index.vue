<script>
export default {
  data() {
    return {
      publications: [
        {
          title:
            'Testing “the Locust Hypothesis”: the Impact of Global Investors on Long-term Investment and Innovation',
          authors: 'Pedro Matos, Jan Bena, Miguel A Ferreira, Pedro Pires',
          date: 'November 2018',
          publication: 'UVA Darden Research Briefing',
          intro:
            'As the world economy has become increasingly globalized and complex, it’s not obvious what effects foreign investors — say, Chinese investors in an American company or American investors in a British company — have on the companies whose stock they hold. Is it possible that these foreign investors provide pools of capital that firms can access in order to produce stronger companies or do they behave more like a swarm of locusts, resulting in nearsighted corporate policymaking?',
          imgSrc:
            'https://res.cloudinary.com/asifm/image/upload/h_150/v1541443135/locust-briefing-cover_lwu3n2.png',
          downloadLink: '/documents/UVA-Darden-Research-Briefing.pdf',
          readMoreLink: '',
        },
        {
          title:
            'Are Foreign Investors Locusts? The Long-term Effects of Foreign Institutional Ownership',
          authors: 'Jan Bena, Miguel A Ferreira, Pedro Matos, Pedro Pires',
          date: 'October 2017',
          publication: 'Journal of Financial Economics',
          intro:
            'This paper challenges the view that foreign investors lead firms to adopt a short-term orientation and forgo long-term investment. Using a comprehensive sample of publicly listed firms in 30 countries over the period 2001–2010, we find instead that greater foreign institutional ownership fosters long-term investment in tangible, intangible and human capital. Foreign institutional ownership also leads to significant increases in innovation output.',
          imgSrc:
            'https://ars.els-cdn.com/content/image/1-s2.0-S0304405X17X0010X-cov150h.gif',
          downloadLink: '',
          readMoreLink:
            'https://www.sciencedirect.com/science/article/pii/S0304405X17301526',
        },
      ],
    };
  },
};
</script>

<template lang="pug">
.uk-section.uk-animation-slide-top-small
  .uk-container.uk-container-expand
    h1.uk-heading-small Research and Publications
    p The Global Corporate Patent Dataset have been used in the following publications.
    .uk-grid.uk-grid(uk-grid).uk-grid-large
      div(class="uk-width-1-2@m" v-for="(pub, i) in publications" :key="i")
        .uk-card.uk-card-body.uk-card-default.uk-padding-small
          .uk-card-header
            .uk-h4.my-text-heavy.fg-blue-700 {{ pub.title }}
            .uk-h5.uk-margin-remove
              span.fg-blue {{ pub.publication }} 
              span.fg-orange-700 {{ pub.date }}
            p.uk-text-small.uk-margin-remove-top {{ pub.authors }}

            img.uk-box-shadow-small(:src="pub.imgSrc" :alt="pub.publication").uk-float-left.uk-margin-right.uk-margin-bottom
            p.uk-text-small.fg-blue {{ pub.intro }}
          .uk-card-footer
            button.uk-button.uk-button-primary(v-if="pub.downloadLink")
              a(:href="pub.downloadLink" download).uk-link-reset Download

            button.uk-button.uk-button-secondary(v-if="pub.readMoreLink")
              a(:href="pub.readMoreLink" ).uk-link-reset Read More
</template>
