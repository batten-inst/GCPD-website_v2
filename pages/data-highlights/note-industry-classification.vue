<script>
import { lists } from '@/assets/data/listData';
lists.sectors.shift();
export default {
  data() {
    return {
      sectorsArr: lists.sectors,
    };
  },
};
</script>

<template lang="pug">
.uk-section
  .uk-container
    h1 Industry Classification
    p We use the &amp; Fama French 12-sector classification in this website. In the interest of brevity, we shortened the names of the sectors as follows.
    dl(v-for="sector in sectorsArr").uk-card-default.uk-card-body.uk-padding-small
      dt {{sector.sector}}
      dd {{sector.sector_desc}}

</template>
