<script>
import { formatNumber } from '@/assets/js/utility';

export default {
  props: {
    company: {
      type: Object,
      default: () => {},
    },
    startYear: {
      type: Number,
      default: null,
    },
    endYear: {
      type: Number,
      default: null,
    },
  },
  methods: {
    removeLastWord(str) {
      let lastIndex = str.lastIndexOf(' ');
      return str.substring(0, lastIndex);
    },
    formatNumber,
  },
};
</script>

<template lang="pug">
  div.bg-white.uk-padding-small.uk-animation-fade.uk-padding-small.uk-padding-remove-left
    ul.uk-card-header
      li.uk-text-small.fg-black 
        | {{ company.value.industry}}
      li.fg-blue.uk-text-bold.uk-text-uppercase.uk-text-break 
        | {{ company.key | removePeriods }}
      li.uk-text-meta 
        | {{ company.value.city }}, {{ company.value.country }}
      li &nbsp;
      li.uk-text-small Annual average during currently selected years.
    ul.uk-list.uk-text-right.fg-orange
      li Assets 
        span.fg-blue
          | $ <span>{{ formatNumber(company.value.assets, 1e6) }}</span>
      li R&amp;D Exp. 
        span.fg-blue 
          | $ <span>{{ formatNumber(company.value.rdex, 1e6) }}</span>
      li Capital Exp. 
        span.fg-blue 
          | $ <span>{{ formatNumber(company.value.capex, 1e6) }}</span>
      li Sales 
        span.fg-blue
          | $ <span>{{ formatNumber(company.value.sales, 1e6) }}</span>
      li EBITDA 
        span.fg-blue
          | $ <span class="">{{ formatNumber(company.value.ebitda, 1e6) }}</span>

    div.uk-card-footer
      p.uk-text-meta.my-text-tiny
        a.fg-blue-400(
          target="_blank" 
          rel="noreferrer" 
          :href="`https://patents.google.com/?assignee=${ removeLastWord(company.key) }&before=filing:${endYear}1231&after=filing:${startYear}0101&type=PATENT&num=50&sort=new`")
          | Search Patents
        span  | 
        a.fg-orange-600(
          target="_blank"
          rel="noreferrer" 
          :href="'https://www.google.com/search?q=%22'+ removeLastWord(company.key) +'%22+%22'+company.value.country+'%22'")
          | Search Company

</template>
