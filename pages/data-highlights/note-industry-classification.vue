<script>
import { lists } from '@/assets/data/listData';
lists.industries.shift();
export default {
  data() {
    return {
      industriesArr: lists.industries,
    };
  },
};
</script>

<template lang="pug">
.uk-section
  .uk-container
    h1 Industry Classification
    p We use the &amp; Fama French 12-industry classification in this website. In the interest of brevity, we shortened the names of the industries as follows.
    dl(v-for="industry in industriesArr").uk-card-default.uk-card-body.uk-padding-small
      dt {{industry.industry}}
      dd {{industry.industry_desc}}

</template>
