<script>
// FilterBus is a globally registered vue component (event bus) whose sole purpose is to transfer data between components
import { FilterBus } from '@/assets/js/FilterBus';

import { lists } from '@/assets/data/listData';

const sectors = lists.sectors;

export default {

  props: {
    listLength: { type: Number, default: 25 },
  },
  data() {
    return {
      geography: '',
      sector: '',
      startYear: null,
      endYear: null,
      topCompanies: [],
      sumPatentsInSelectedData: null,
      numCompaniesInSelectedData: null,
    };
  },
  methods: {
    removeLastWord(str) {
      let lastIndex = str.lastIndexOf(' ');
      return str.substring(0, lastIndex);
    },
  },
  computed: {
    sector_desc: function () {
      return this.sector !== undefined && this.sector !== ''
        ? sectors.find(el => el.sector === this.sector).sector_desc
        : '';
    },
  },

  beforeCreate() {
    // listen for new data from compute-data component
    FilterBus.$on('new-data', dataObj => {
      const { sector, geography, rangeYears, companyGrp, cf } = dataObj;
      this.sector = sector;
      this.geography = geography;
      this.startYear = rangeYears[0];
      this.endYear = rangeYears[1];

      this.sumPatentsInSelectedData = cf
        .groupAll()
        .reduceSum(d => d.patentcount)
        .value();

      companyGrp.order(d => d.patentcount);

      const allCompanies = companyGrp.top(Infinity);
      this.topCompanies = allCompanies.filter(el => el.value.patentcount);

      this.numCompaniesInSelectedData = this.topCompanies.length;
    });
  },
};
</script>

<template lang="pug">
div(
  v-show="topCompanies"
  )
  div.uk-card-header.uk-padding-small.uk-animation-fade.uk-tile-muted
    
    h3.uk-h3.my-text-thin.uk-animation-fade.fg-blue-400.uk-margin-remove(
      class="uk-visible@m"
      v-show="sumPatentsInSelectedData > 0"
      ) {{ sumPatentsInSelectedData | thousandComma }} patents
    
    h5.uk-h5.fg-orange-900.uk-margin-remove(
      v-show="numCompaniesInSelectedData > 0"
      ) By {{ numCompaniesInSelectedData  | thousandComma  }} companies in
    
    h4.uk-h4.fg-blue-300.uk-margin-small  {{ geography }} <br />
      span.fg-orange-300  {{ sector_desc }}
    
    div
      span.my-text-tiny.uk-label.region-label.asia-pacific Asia Pacific
      span.my-text-tiny.uk-label.region-label.europe Europe
      span.my-text-tiny.uk-label.region-label.north-america North America
      span.my-text-tiny.uk-label.region-label.other Other
  
  ul.uk-list.uk-padding-remove
    li#top-company-card.uk-text-left.uk-animation-slide-left.uk-padding-small.uk-box-shadow-small.list-item(
      v-for="(company, i) in topCompanies.slice(0, listLength)" 
      :key="company.value.gvkey" 
      :class="company.value.region | makeKebab "
      )
      div
        span.uk-label.bg-white.fg-blue.uk-position-top-right
          | {{ i+1 }}
        li
          a.fg-black.uk-text-bold.uk-text-uppercase(
                target="_blank"
                rel="noreferrer" 
                :href="'https://www.google.com/search?q=%22'+ company.key +'%22+%22'+company.value.country+'%22'")
                | {{ company.key }}
 
        h3.uk-margin-remove.fg-blue-900.uk-text-large.uk-float-right
          a(
                target="_blank" 
                rel="noreferrer" 
                :href="`https://patents.google.com/?assignee=${ company.key }&after=filing:${startYear}0101&before=filing:${endYear}1231&type=PATENT&num=50&sort=new`")
            | {{ company.value.patentcount | thousandComma }}
        li.uk-text-small
          | {{ company.value.city }}, {{ company.value.country }}
        li.uk-text-meta
          | {{ company.value.sector }}

</template>
