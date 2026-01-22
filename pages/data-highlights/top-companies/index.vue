<script>
import dl from 'datalib';
import { VueSelect } from 'vue-select';
import { fillRange, formatNumber } from '@/assets/js/utility';
import { lists } from '@/assets/data/listData';

export default {
  components: {
    VueSelect,
    // ComputeListTopCompanies,
  },
  data() {
    return {
      data_: dl.csv(require('@/assets/data/20190505_df_2007to16_top10.csv')),
      regionList: [
        'All Regions',
        'North America',
        'Europe',
        'Asia Pacific',
        'Other',
      ],
      industryList: lists.industries.map(el => el.industry),
      region: 'All Regions',
      industry: 'All Industries',
      showFinancials: false,
      years: fillRange(2012, 2016),
      showLastFiveYears: true,
    };
  },
  computed: {
    dataByYear() {
      return this.years.map(year => {
        const filterFunc =
          this.region === 'All Regions' && this.industry === 'All Industries'
            ? row => row.year === year
            : this.region === 'All Regions' &&
              this.industry !== 'All Industries'
            ? row => row.year === year && row.industry === this.industry
            : this.region !== 'All Regions' &&
              this.industry === 'All Industries'
            ? row => row.year === year && row.region === this.region
            : row =>
                row.year === year &&
                row.region === this.region &&
                row.industry === this.industry;
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
        ? fillRange(2012, 2016)
        : fillRange(2007, 2011);
    },
  },
};
</script>

<template lang="pug">

.uk-section.uk-animation-slide-top-small
  .uk-container
    h1.uk-heading-small Leading Innovators
    div(class="uk-column-1-2@s")
      p Patent assignment indicates ownership of a patent, that is, the rights to all benefits accruing from that patent. It does not necessarily mean the invention originated within the assignee company. However, patent ownership does indicate a company's interest in developing innovative products and processes. Hence, irrespective of a company's role in an invention, we here assume the company's ownership of the related patent signals a strong intent to pursue innovation.
      p Between 2007 and 2016 (the last ten full years for which we have data), about 1.37 million USPTO patents were granted and subsequently assigned to publicly listed companies. The patents were well distributed across countries, illustrating the global nature of innovation.
      p Non-U.S. firms owned rights to more than half of these patents. Surpassing U.S. firms, Japanese companies had the highest number of patents per firm. Overall, European firms filed fewer patents than North American or Asian firms.
      p IBM has consistently been the top firm in recent times. Asian firms rose notably among the top innovators, with a strong presence in the consumer electronics sector (e.g., Samsung, Sony, and Panasonic). More recently, U.S. companies have staged a comeback, particularly those in the technology sector (e.g., Intel, Alphabet, and Qualcomm). 

    div.uk-padding-small.uk-margin-top
      h3 Top Ten Companies <span class="fg-orange-900">by Yearly Counts of Patents Assigned</span>
      p The years indicate when the patents were granted by the USPTO.
     
      #control-panel.uk-grid(uk-grid).uk-margin-auto.uk-flex-bottom
        div(class="uk-width-1-4@s").uk-card.uk-card-body.uk-padding-small
          vue-select(:options="regionList" v-model="region" :clearable="false" max-height="300px")
          br 
          vue-select(:options="industryList" v-model="industry" :clearable="false")

        div.uk-card.uk-card-body.uk-padding-small
          button.uk-button.uk-button-small(@click="showFinancials = !showFinancials") 
            span(v-if="!showFinancials") Show Financial Summary
            span(v-else) Hide Financial Summary
          br
          br
          button.uk-button.uk-button-small(@click="updateYearsToShow") 
            span(v-if="showLastFiveYears") Show Years 2007–2011
            span(v-else) Show Years 2012–2016

        div.uk-card.uk-card-body.uk-padding-small
          div
            .uk-h5 What the colors mean
            span.my-text-tiny.uk-label.region-label.asia-pacific Asia Pacific
            span.my-text-tiny.uk-label.region-label.europe Europe
            span.my-text-tiny.uk-label.region-label.north-america North America
            span.my-text-tiny.uk-label.region-label.other Other
        div.uk-card.uk-card-body.uk-padding-small
          .uk-h5 See more data highlights
          ul.uk-list
            li: nuxt-link(to="/data-highlights/rise-of-asia") The Rise of Asia 
            li: nuxt-link(to="/data-highlights/tech-leading-innovation") Technology Industry Leading in Innovation 
    div.bg-white.uk-padding-small.uk-padding-remove-left
      .uk-grid.uk-grid-small(uk-grid class="uk-child-width-1-3@s uk-child-width-expand@m")
        .uk-panel(v-for="yearArr in dataByYear.slice(0, 5)")
          .uk-label.bg-orange-900.uk-text-large.uk-box-shadow-small(v-if="yearArr[0] !== undefined") {{ yearArr[0].year }}
          .uk-card.uk-animation-fade.uk-card-default.uk-margin-small-bottom(v-for="(companyObj, i) in yearArr")
            ul.company-info-card.uk-list.uk-padding-small.uk-margin-remove.uk-inline-clip(:class="companyObj.region | makeKebab")
              li.uk-text-small
                | {{ companyObj.industry}}
              li.fg-blue.uk-text-bold.uk-text-uppercase.uk-text-break.uk-margin-remove
                | {{ companyObj.company | removePeriods }}
              li.uk-text-small.uk-margin-remove.uk-padding-remove.uk-text-left.fg-blue
                | {{ companyObj.country }}
              li.fg-black.uk-padding-small.uk-position-bottom-right
                span.uk-text-emphasis.patentcount {{ companyObj.patentcount | thousandComma }}
              span.uk-label.bg-white.fg-blue.uk-position-top-right.my-text-heavy.uk-box-shadow-small
                | {{ i+1 }}
            ul(v-if="showFinancials").uk-list.uk-animation-slide-top-small.fg-orange-900.uk-text-right.uk-text-small.uk-padding-small.uk-padding-remove-top.financials
              li Assets 
                span.fg-blue
                  | $ <span>{{ formatNumber(companyObj.assets, 1e6) }}</span>
              li R&amp;D Exp. 
                span.fg-blue 
                  | $ <span>{{ formatNumber(companyObj.rdex, 1e6) }}</span>
              li Capital Exp. 
                span.fg-blue 
                  | $ <span>{{ formatNumber(companyObj.capex, 1e6) }}</span>
              li Sales 
                span.fg-blue
                  | $ <span>{{ formatNumber(companyObj.sales, 1e6) }}</span>
              li EBITDA 
                span.fg-blue
                  | $ <span class="">{{ formatNumber(companyObj.ebitda, 1e6) }}</span>

    

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
