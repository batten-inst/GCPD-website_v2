<script>
import { lists } from '@/assets/data/listData';
export default {
  data() {
    lists.sectors.shift();
    lists.sectors.pop();
    return {
      sectorsArr: lists.sectors,
    };
  },
};
</script>

<template lang="pug">
.uk-section
  .uk-container
    h1 Sector Classification
    p For the visuals in this website, we use the <a href="https://www.spglobal.com/spdji/en/landing/topic/gics/" target="_blank" rel="noopener">Global Industry Classification Standard (GICS)</a>, developed in 1999 by S&P Dow Jones Indices and MSCI. Previously, we used Fama French 12-industry classification.
    dl(v-for="sector in sectorsArr").uk-padding-small.uk-margin-remove.bg-blue-50
      dt {{sector.sector}} [{{sector.sector_code}}]
      dd <span class="uk-text-meta">{{sector.sector_desc}}</span> <br> {{sector.sector_desc_long}}

</template>
