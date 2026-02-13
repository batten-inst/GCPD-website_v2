<script>

import { VueSelect } from 'vue-select';
import { fillRange, formatNumber } from '@/assets/js/utility';
import { lists } from '@/assets/data/listData';

import { top10CompaniesDataProm } from '@/assets/js/fetchData';

export default {
  components: {
    VueSelect,
  },
  data() {
    return {
      // data_: dl.csv(require('@/assets/data/top10_2014to2023.csv')),
      data_: [],
      regionList: [
        'All Regions',
        'North America',
        'Europe',
        'Asia Pacific',
        'Other',
      ],
      sectorList: lists.sectors.map(el => el.sector),
      region: 'All Regions',
      sector: 'All Sectors',
      years: fillRange(2019, 2023),
      showLastFiveYears: true,
    };
  },
  computed: {
    dataByYear() {
      return this.years.map(year => {
        const filterFunc =
          this.region === 'All Regions' && this.sector === 'All Sectors'
            ? row => row.year === year
            : this.region === 'All Regions' &&
              this.sector !== 'All Sectors'
              ? row => row.year === year && row.sector === this.sector
            : this.region !== 'All Regions' &&
                this.sector === 'All Sectors'
            ? row => row.year === year && row.region === this.region
            : row =>
                row.year === year &&
                row.region === this.region &&
                  row.sector === this.sector;
        return this.data_
          .filter(filterFunc)
          .sort((a, b) => b.patentcount - a.patentcount)
          .slice(0, 10);
      });
    },
  },
  methods: {
    formatNumber,
    removeLastWord(str) {
      let lastIndex = str.lastIndexOf(' ');
      return str.substring(0, lastIndex);
    },
    updateYearsToShow() {
      this.showLastFiveYears = !this.showLastFiveYears;
      this.years = this.showLastFiveYears
        ? fillRange(2019, 2023)
        : fillRange(2014, 2018);
    },
  },
  created() {
    top10CompaniesDataProm
      .then(data => {
        this.data_ = data;
      })
      .catch(err => {
        /* eslint-disable no-console */
        console.error('Failed to load top10CompaniesDataProm', err);
      });
  },
};
</script>

<template lang="pug">

.uk-section.uk-animation-slide-top-small
  .uk-container
    h1.uk-heading-small Leading Innovators
    div(class="uk-column-1-2@s")
      p Patent assignment indicates ownership of a patent, that is, the rights to all benefits accruing from that patent. It does not necessarily mean the invention originated within the assignee company. However, patent ownership does indicate a company's interest in developing innovative products and processes. Hence, irrespective of a company's role in an invention, we here assume the company's ownership of the related patent signals a strong intent to pursue innovation.
      p Between 2013 and 2022 (the last ten full years for which we have data), more than 2.3 million USPTO patents were granted and subsequently assigned to publicly listed companies. The patents were well distributed across countries, illustrating the global nature of innovation.

    div.uk-padding-small.uk-margin-top
      h3 Top Ten Companies <span class="fg-orange-900">by Yearly Counts of Patents Assigned</span>
      p The years indicate when the patents were granted by the USPTO. 
        nuxt-link(to="/data-highlights/note-sector-classification") See sector classification details.
     
      #control-panel.uk-grid(uk-grid).uk-margin-auto.uk-flex-bottom
        div(class="uk-width-1-4@s").uk-card.uk-card-body.uk-padding-small
          vue-select(:options="regionList" v-model="region" :clearable="false" max-height="300px")
          br 
          vue-select(:options="sectorList" v-model="sector" :clearable="false")

        div.uk-card.uk-card-body.uk-padding-small
          button.uk-button.uk-button-small(@click="updateYearsToShow") 
            span(v-if="showLastFiveYears") Show Years 2014–2018 
            span(v-else) Show Years 2019–2023

        div.uk-card.uk-card-body.uk-padding-small
          div
            .uk-h5.uk-text-meta What the colors mean
            span.my-text-tiny.uk-label.region-label.asia-pacific Asia Pacific
            span.my-text-tiny.uk-label.region-label.europe Europe
            span.my-text-tiny.uk-label.region-label.north-america North America
            span.my-text-tiny.uk-label.region-label.other Other
        
    div.bg-white.uk-padding-small.uk-padding-remove-left
      .uk-grid.uk-grid-small(uk-grid class="uk-child-width-1-3@s uk-child-width-expand@m")
        .uk-panel(v-for="yearArr in dataByYear.slice(0, 5)")
          .uk-label.bg-orange-900.uk-text-large.uk-box-shadow-small(v-if="yearArr[0] !== undefined") {{ yearArr[0].year }}
          .uk-card.uk-card-default.uk-margin-small-bottom(v-for="(companyObj, i) in yearArr")
            ul.uk-animation-slide-left.company-info-card.uk-list.uk-padding-small.uk-margin-remove.uk-inline-clip(:class="companyObj.region | makeKebab")
              li.uk-text-small.uk-animation-slide-left
                | {{ companyObj.sector}}
              li.fg-blue.uk-text-bold.uk-text-uppercase.uk-text-break.uk-margin-remove
                | {{ companyObj.company | removePeriods }}
              li.uk-text-small.uk-margin-remove.uk-padding-remove.uk-text-left.fg-blue
                | {{ companyObj.country }}
              li.fg-black.uk-padding-small.uk-position-bottom-right
                span.uk-text-emphasis.patentcount {{ companyObj.patentcount | thousandComma }}
              span.uk-label.bg-white.fg-blue.uk-position-top-right.my-text-heavy.uk-box-shadow-small
                | {{ i+1 }}
    

</template>

<style lang="scss">
// @import 'vue-select/dist/vue-select.css';
#control-panel {
  border-bottom: 1px solid #232d4b;
}
.company-info-card {
  font-family: FranklinGothicURW;
  display: list-item;
}
.financials {
  line-height: 0.9rem;
}
</style>
