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
    encodeStr(str) {
      return encodeURIComponent(str);
    },
    cleanCompanyName(str) {
      let cleaned = str.replace(/\s*\([^)]*\)/g, '');
      return cleaned.trim();
    },
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
      p Patent assignment signifies ownership -- and thus the rights to all benefits accruing from a patent. It doesn't guarantee the invention originated in the assignee company, but it shows the company's commitment to developing innovative products and processes. Thus, we assume that owning the patent reflects a strong intent to pursue innovation, regardless of the company's role in the invention.
    div.uk-padding-small.uk-margin-top
      h3 Top Ten Companies <span class="fg-orange-900">by Yearly Counts of Patents</span> | {{ !showLastFiveYears ? '2014–2018' : '2019–2023' }} 
     
      #control-panel.uk-grid.uk-margin-auto.uk-flex-bottom(class="uk-child-width-1-3@m")
        div.uk-card.uk-card-body.uk-padding-small
          vue-select(:options="regionList" v-model="region" :clearable="false" max-height="300px")
          br 
          vue-select(:options="sectorList" v-model="sector" :clearable="false")

        div.uk-card.uk-card-body.uk-padding-small
          button.uk-button.uk-button-small.uk-text-small.uk-margin-remove(@click="updateYearsToShow") 
            span(v-if="showLastFiveYears") Show 2014–2018 
            span(v-else) Show 2019–2023

        
        div.uk-margin-remove.uk-text-small.uk-padding-small
          p.uk-text-meta The years indicate when the patents were granted by the USPTO. See sector classification details 
            nuxt-link(to="/data-highlights/note-sector-classification") here.

          div.uk-margin-top
            p.uk-text-meta.uk-margin-remove What the colors mean
            span.my-text-tiny.uk-label.region-label.asia-pacific Asia Pacific
            span.my-text-tiny.uk-label.region-label.europe Europe
            span.my-text-tiny.uk-label.region-label.north-america North America
            span.my-text-tiny.uk-label.region-label.other Other
    div.bg-white.uk-padding-small.uk-padding-remove-left
      .uk-grid.uk-grid-medium(uk-grid class="uk-child-width-1-3@s uk-child-width-expand@m")
        .uk-panel(v-for="yearArr in dataByYear.slice(0, 5)")
          .uk-label.bg-orange-900.uk-text-large.uk-box-shadow-small(v-if="yearArr[0] !== undefined") {{ yearArr[0].year }}
          .uk-card.uk-card-default.uk-margin-small-bottom(v-for="(companyObj, i) in yearArr" :class="companyObj.region | makeKebab")
            ul.uk-list.uk-padding-small.uk-margin-remove.list-item
              div
                span.uk-label.bg-white.fg-blue.uk-position-top-right
                  | {{ i+1 }}
                li
                  a.uk-text-bold.uk-text-uppercase(
                        target="_blank"
                        rel="noreferrer" 
                        :href="'https://www.google.com/search?q=%22'+ encodeStr(companyObj.company) +'%22+%22'+encodeStr(companyObj.country)+'%22'")
                        | {{ companyObj.company | removePeriods }}
  
                li.uk-text-small.fg-blue-300
                  span(v-if="companyObj.city") {{ companyObj.city }}, 
                  | {{ companyObj.country }}
                li.uk-text-small.fg-orange-900
                  | {{ companyObj.sector }}
    
                li.uk-margin-remove.uk-text-small
                  a(
                        target="_blank" 
                        rel="noreferrer" 
                        :href="`https://patents.google.com/?assignee=${ encodeStr(cleanCompanyName(companyObj.company)) }&after=filing:${companyObj.year}0101&before=filing:${companyObj.year}1231&type=PATENT&num=50&sort=new`")
                    | {{ companyObj.patentcount | thousandComma }} patents

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
